import { ReactiveTranslationMixin } from '@Anarchy/i18n/Mixins';
import type { TLocale, TLocaleId, TLocalesMapping, TMessages, TReactiveTranslationMixin, TTranslationService } from '@Anarchy/i18n/Models';
import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import type { FormatNumberOptions, IntlCache, IntlShape } from '@formatjs/intl';
import { createIntl, createIntlCache } from '@formatjs/intl';
import type { FormatDateOptions } from '@formatjs/intl/src/types';
import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, concatMap, distinctUntilChanged, filter, firstValueFrom, from, map, Subject } from 'rxjs';

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
    // console.log('XXX11', ready$.value);
    console.log('XXX8 1 getIntl', locale.id);
    const existed: IntlShape<string> | undefined = intlMap.get(locale.id);
    console.log('XXX8 2 existed', locale.id, existed?.locale);
    if (isDefined(existed)) return existed;

    const current: TMessages = loaded.get(locale.id) ?? {};
    const fallback: TMessages = loaded.get(defaultLocale.id) ?? {};

    console.log('XXX10 1', current);
    console.log('XXX10 2', fallback);
    console.log('XXX10 3', loaded);
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

    console.log('XXX9', locale.id, messages['gui.bottom.button.attack.title']);

    loaded.set(locale.id, messages);
    removeFromLoading(locale.id);

    // intlMap.clear();
    // intl$.next(getIntl(locale));

    return Promise.resolve();
  }

  async function loadLocaleSafe(loadFn: () => Promise<TMessages>, localeId: TLocaleId): Promise<TMessages> | never {
    try {
      return await loadFn();
    } catch (error) {
      throw new Error(`[TranslateService]: Failed to load locale "${localeId}". Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  const localeSub$: Subscription = locale$
    .pipe(
      distinctUntilChanged((prev: TLocale, current: TLocale): boolean => prev.id === current.id),
      concatMap((locale: TLocale) => from(loadLocale(locale)).pipe(map((): [TLocale, IntlShape<string>] => [locale, getIntl(locale)])))
    )
    .subscribe(([locale, intl]: [TLocale, IntlShape<string>]): void => {
      const html: HTMLElement | undefined = document?.documentElement;
      html?.setAttribute?.('lang', intl.locale);
      html?.setAttribute?.('dir', locale.direction);

      // This allows to change the font depending on the locale.
      // To have effect, you should define in related @fontFaces and add variable, e.g.:
      //:root {
      //   --anarchy-i18n-font: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      // }
      // body { font-family: var(--anarchy-i18n-font); }
      if (isDefined(locale.font)) html?.style?.setProperty('--anarchy-i18n-font', locale.font);

      return void intl$.next(intl);
    });

  //Preload the locales (without waiting for the result)
  locale$.next(defaultLocale);
  if (defaultLocale.id !== initialLocale.id) locale$.next(initialLocale);

  const destroySub$: Subscription = destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    localeSub$.unsubscribe();

    ready$.complete();
    intl$.complete();
  });

  const waitForTrue = async (source$: Observable<boolean>): Promise<void> => firstValueFrom(source$.pipe(filter(Boolean)));

  const result: Omit<TTranslationService, keyof TReactiveTranslationMixin> = {
    // translate: (id: string, params?: Record<string, string>): string | never => {
    translate: async (id: string, params?: Record<string, string>): Promise<string> | never => {
      await waitForTrue(ready$);
      console.log('XXX12', ready$.value);
      console.log('XXX13', getIntl(locale$.value).locale, locale$.value.id);
      //awaiting for ready$.value is true
      // await new Promise<void>((resolve: () => void): void => {
      //   if (ready$.value) return resolve();
      // });

      // const intl: IntlShape<string> | undefined = intl$.value;
      const intl: IntlShape<string> | undefined = getIntl(locale$.value);
      console.log('XXX8 3 intl.locale', intl?.locale);
      if (isNotDefined(intl)) throw new Error(`[TranslateService]: The service is not ready. Tried to translate: "${id}"`);

      const defaultMessage: string = (loaded.get(defaultLocale.id) ?? {})[id] ?? id;
      const result: string = intl.formatMessage({ id, defaultMessage }, params);
      if (id === 'gui.bottom.button.attack.title') console.log('XXX8 4 result', intl.locale, locale$.value.id, defaultMessage, result);

      if (result === id) console.warn(`[TranslateService]: Can't find translation for "${id}".`);
      return result;
    },
    // TODO DESKTOP: formatDate and formatNumber also should be async to wait for intl to be ready
    formatDate: (value: Date | number, options?: FormatDateOptions): string | never => {
      const intl: IntlShape<string> | undefined = intl$.value;
      if (isDefined(intl)) return intl.formatDate(value, options);
      throw new Error(`[TranslateService]: The service is not ready. Tried to formatDate: "${value}"`);
    },
    formatNumber: (value: number, options?: FormatNumberOptions): string | never => {
      const intl: IntlShape<string> | undefined = intl$.value;
      if (isDefined(intl)) return intl.formatNumber(value, options);
      throw new Error(`[TranslateService]: The service is not ready. Tried to formatNumber: "${value}"`);
    },
    ready$,
    locale$,
    destroy$,
    intl$: intl$.asObservable()
  };

  const reactiveMixin: TReactiveTranslationMixin = ReactiveTranslationMixin(result);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(result, reactiveMixin);
}
