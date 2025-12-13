import { ReactiveTranslationMixin } from '@Anarchy/i18n/Mixins';
import type { TLocale, TLocalesMapping, TMessages, TReactiveTranslationMixin, TTranslationService } from '@Anarchy/i18n/Models';
import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import type { FormatNumberOptions, IntlCache, IntlShape } from '@formatjs/intl';
import { createIntl, createIntlCache } from '@formatjs/intl';
import type { FormatDateOptions } from '@formatjs/intl/src/types';
import type { Subscription } from 'rxjs';
import { BehaviorSubject, concatMap, distinctUntilChanged, from, map, Subject } from 'rxjs';

export function TranslationService(initialLocale: TLocale, defaultLocale: TLocale, locales: TLocalesMapping): TTranslationService {
  const loaded: Map<TLocale, TMessages> = new Map<TLocale, TMessages>();
  const loadingLocale$: BehaviorSubject<Set<TLocale>> = new BehaviorSubject<Set<TLocale>>(new Set());

  //Preload the locales (without waiting the result)
  void Promise.all([loadLocale(defaultLocale), loadLocale(initialLocale)]);

  const cache: IntlCache = createIntlCache();
  const ready$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const locale$: BehaviorSubject<TLocale> = new BehaviorSubject<TLocale>(initialLocale);
  const destroy$: Subject<void> = new Subject<void>();

  const intlMap: Map<TLocale, IntlShape<string>> = new Map<TLocale, IntlShape<string>>();
  const intl$: BehaviorSubject<IntlShape<string> | undefined> = new BehaviorSubject<IntlShape<string> | undefined>(undefined);

  function getIntl(locale: TLocale): IntlShape<string> {
    const existed: IntlShape<string> | undefined = intlMap.get(locale);
    if (isDefined(existed)) return existed;

    const current: TMessages = loaded.get(locale) ?? {};
    const fallback: TMessages = loaded.get(defaultLocale) ?? {};
    const intl: IntlShape<string> = createIntl({ locale: locale.id, defaultLocale: defaultLocale.id, messages: { ...fallback, ...current } }, cache);

    intlMap.set(locale, intl);

    return intl;
  }

  async function loadLocale(locale: TLocale): Promise<void> | never {
    try {
      loadingLocale$.next(new Set([...loadingLocale$.value, locale]));
      const loadFn = locales[locale.id];
      if (isNotDefined(loadFn)) throw new Error('[TranslateService]: The locale is not defined in the locales mapping');
      if (!loaded.has(locale)) loaded.set(locale, await loadFn());
      //I'm not 100% sure, that intlMap.clear() is really needed here
      intlMap.clear();
      intl$.next(getIntl(locale));
    } catch (error) {
      throw new Error(`[TranslateService]: Failed to load locale "${locale}". Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      const newLoading: Set<TLocale> = new Set(loadingLocale$.value);
      newLoading.delete(locale);
      loadingLocale$.next(newLoading);
    }
  }

  const loadingLocaleSub$: Subscription = loadingLocale$
    .pipe(
      map((list: Set<TLocale>): boolean => list.size === 0),
      distinctUntilChanged()
    )
    .subscribe((v: boolean): void => void ready$.next(v));

  const localeSub$: Subscription = locale$
    .pipe(
      distinctUntilChanged(),
      concatMap((locale: TLocale) => from(loadLocale(locale)).pipe(map((): IntlShape<string> => getIntl(locale))))
    )
    .subscribe((intl: IntlShape<string>): void => {
      document?.documentElement?.setAttribute?.('lang', intl.locale);
      return void intl$.next(intl);
    });

  const destroySub$: Subscription = destroy$.subscribe(() => {
    destroySub$.unsubscribe();
    loadingLocaleSub$.unsubscribe();
    localeSub$.unsubscribe();

    ready$.complete();
    loadingLocale$.complete();
    intl$.complete();
  });

  const result: Omit<TTranslationService, keyof TReactiveTranslationMixin> = {
    translate: (id: string, params?: Record<string, string>): string | never => {
      const intl: IntlShape<string> | undefined = intl$.value;
      if (isDefined(intl)) {
        const defaultMessage: string = (loaded.get(defaultLocale) ?? {})[id] ?? id;
        const result: string = intl.formatMessage({ id, defaultMessage }, params);
        if (result === id) console.warn(`[TranslateService]: Can't find translation for "${id}".`);
        return result;
      }
      throw new Error(`[TranslateService]: The service is not ready. Tried to translate: "${id}"`);
    },
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

  const reactiveMixin = ReactiveTranslationMixin(result);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(result, reactiveMixin);
}
