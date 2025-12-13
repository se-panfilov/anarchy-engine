import { ReactiveTranslationMixin } from '@Anarchy/i18n/Mixins';
import type { TLocale, TLocaleId, TLocalesMapping, TMessages, TReactiveTranslationMixin, TTranslationService } from '@Anarchy/i18n/Models';
import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import type { FormatNumberOptions, IntlCache, IntlShape } from '@formatjs/intl';
import { createIntl, createIntlCache } from '@formatjs/intl';
import type { FormatDateOptions } from '@formatjs/intl/src/types';
import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, filter, firstValueFrom, Subject } from 'rxjs';

export function TranslationService(initialLocale: TLocale, defaultLocale: TLocale, locales: TLocalesMapping): TTranslationService {
  const loaded: Map<TLocaleId, TMessages> = new Map<TLocaleId, TMessages>();
  const loadingLocales: Set<TLocaleId> = new Set();

  const cache: IntlCache = createIntlCache();
  const ready$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const locale$: BehaviorSubject<TLocale> = new BehaviorSubject<TLocale>(initialLocale);
  const destroy$: Subject<void> = new Subject<void>();

  const intlMap: Map<TLocaleId, IntlShape<string>> = new Map<TLocaleId, IntlShape<string>>();
  const intl$: BehaviorSubject<IntlShape<string> | undefined> = new BehaviorSubject<IntlShape<string> | undefined>(undefined);

  function getIntl(locale: TLocale): IntlShape<string> {
    const existed: IntlShape<string> | undefined = intlMap.get(locale.id);
    if (isDefined(existed)) return existed;

    const current: TMessages = loaded.get(locale.id) ?? {};
    const fallback: TMessages = loaded.get(defaultLocale.id) ?? {};

    const intl: IntlShape<string> = createIntl({ locale: locale.id, defaultLocale: defaultLocale.id, messages: { ...fallback, ...current } }, cache);

    intlMap.set(locale.id, intl);

    return intl;
  }

  function addToLoading(id: TLocaleId): void {
    const before: number = loadingLocales.size;
    loadingLocales.add(id);
    if (loadingLocales.size !== before) ready$.next(loadingLocales.size === 0);
  }

  function removeFromLoading(id: TLocaleId): void {
    const before: number = loadingLocales.size;
    loadingLocales.delete(id);
    if (loadingLocales.size !== before) ready$.next(loadingLocales.size === 0);
  }

  async function loadLocale(locale: TLocale): Promise<void> | never {
    if (loadingLocales.has(locale.id) || loaded.has(locale.id)) return Promise.resolve();
    addToLoading(locale.id);

    const loadFn: (() => Promise<TMessages>) | undefined = locales[locale.id];
    if (isNotDefined(loadFn)) throw new Error('[TranslateService]: The locale is not defined in the locales mapping');
    const messages: TMessages = await loadLocaleSafe(loadFn, locale.id);

    loaded.set(locale.id, messages);
    removeFromLoading(locale.id);

    return Promise.resolve();
  }

  async function loadLocaleSafe(loadFn: () => Promise<TMessages>, localeId: TLocaleId): Promise<TMessages> | never {
    try {
      return await loadFn();
    } catch (error) {
      throw new Error(`[TranslateService]: Failed to load locale "${localeId}". Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async function setLocale(locale: TLocale): Promise<void> {
    await loadLocale(locale);
    getIntl(locale);
    locale$.next(locale);
  }

  const localeSub$: Subscription = locale$.pipe(distinctUntilChanged((prev: TLocale, current: TLocale): boolean => prev.id === current.id)).subscribe((locale: TLocale): void => {
    const html: HTMLElement | undefined = document?.documentElement;
    html?.setAttribute?.('lang', intl$.value?.locale ?? locale.id);
    html?.setAttribute?.('dir', locale.direction);

    // This allows to change the font depending on the locale.
    // To have effect, you should define in related @fontFaces and add variable, e.g.:
    //:root {
    //   --anarchy-i18n-font: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
    // }
    // body { font-family: var(--anarchy-i18n-font); }
    if (isDefined(locale.font)) html?.style?.setProperty('--anarchy-i18n-font', locale.font);
  });

  //Preload the locales (without waiting for the result)
  setLocale(defaultLocale);
  if (defaultLocale.id !== initialLocale.id) setLocale(initialLocale);

  const destroySub$: Subscription = destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    localeSub$.unsubscribe();

    ready$.complete();
    intl$.complete();
  });

  const waitForTrue = async (source$: Observable<boolean>): Promise<boolean> => firstValueFrom(source$.pipe(filter(Boolean)));

  function translate(id: string, params?: Record<string, string>): string | never {
    const intl: IntlShape<string> | undefined = intl$.value;
    // const intl: IntlShape<string> | undefined = getIntl(locale$.value);
    if (isNotDefined(intl)) throw new Error(`[TranslateService]: The service is not ready. Tried to translate: "${id}"`);

    const defaultMessage: string = (loaded.get(defaultLocale.id) ?? {})[id] ?? id;
    const result: string = intl.formatMessage({ id, defaultMessage }, params);

    if (result === id) console.warn(`[TranslateService]: Can't find translation for "${id}".`);
    return result;
  }

  function formatDate(value: Date | number, options?: FormatDateOptions): string | never {
    const intl: IntlShape<string> | undefined = intl$.value;
    if (isDefined(intl)) return intl.formatDate(value, options);
    throw new Error(`[TranslateService]: The service is not ready. Tried to formatDate: "${value}"`);
  }

  function formatNumber(value: number, options?: FormatNumberOptions): string | never {
    const intl: IntlShape<string> | undefined = intl$.value;
    if (isDefined(intl)) return intl.formatNumber(value, options);
    throw new Error(`[TranslateService]: The service is not ready. Tried to formatNumber: "${value}"`);
  }

  const result: Omit<TTranslationService, keyof TReactiveTranslationMixin> = {
    setLocale,
    translateSafe: async (id: string, params?: Record<string, string>): Promise<string> => {
      await waitForTrue(ready$);
      return translate(id, params);
    },
    translate,
    formatDate,
    formatDateSafe: async (value: Date | number, options?: FormatDateOptions): Promise<string> => {
      await waitForTrue(ready$);
      return formatDate(value, options);
    },
    formatNumber,
    formatNumberSafe: async (value: number, options?: FormatNumberOptions): Promise<string> => {
      await waitForTrue(ready$);
      return formatNumber(value, options);
    },
    ready$,
    locale$: locale$.asObservable(),
    getCurrentLocale: (): TLocale => locale$.value,
    destroy$,
    intl$: intl$.asObservable()
  };

  const reactiveMixin: TReactiveTranslationMixin = ReactiveTranslationMixin(result);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(result, reactiveMixin);
}
