import type { TLocalesMapping, TMessages, TTranslateService } from '@Anarchy/i18n/Models';
import { isDefined } from '@Anarchy/Shared/Utils';
import type { FormatNumberOptions, IntlCache, IntlShape } from '@formatjs/intl';
import { createIntl, createIntlCache } from '@formatjs/intl';
import type { FormatDateOptions } from '@formatjs/intl/src/types';
import { BehaviorSubject, concatMap, distinctUntilChanged, from, map } from 'rxjs';

export function TranslateService<TLocale extends string>(initialLocale: TLocale, defaultLocale: TLocale, locales: TLocalesMapping<TLocale>): TTranslateService<TLocale> {
  const loaded: Map<TLocale, TMessages> = new Map<TLocale, TMessages>();
  const loadingLocale$: BehaviorSubject<Set<TLocale>> = new BehaviorSubject<Set<TLocale>>(new Set());

  //Preload the locales (without waiting the result)
  void Promise.all([loadLocale(defaultLocale), loadLocale(initialLocale)]);

  const cache: IntlCache = createIntlCache();
  const ready$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const locale$: BehaviorSubject<TLocale> = new BehaviorSubject<TLocale>(initialLocale);

  const intlMap: Map<TLocale, IntlShape<string>> = new Map<TLocale, IntlShape<string>>();
  const intl$: BehaviorSubject<IntlShape<string> | undefined> = new BehaviorSubject<IntlShape<string> | undefined>(undefined);

  function getIntl(locale: TLocale): IntlShape<string> {
    const existed: IntlShape<string> | undefined = intlMap.get(locale);
    if (isDefined(existed)) return existed;

    const current: TMessages = loaded.get(locale) ?? {};
    const fallback: TMessages = loaded.get(defaultLocale) ?? {};
    const intl: IntlShape<string> = createIntl({ locale, defaultLocale, messages: { ...fallback, ...current } }, cache);

    intlMap.set(locale, intl);

    return intl;
  }

  async function loadLocale(locale: TLocale): Promise<void> {
    try {
      loadingLocale$.next(new Set([...loadingLocale$.value, locale]));
      if (!loaded.has(locale)) loaded.set(locale, await locales[locale]());
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

  loadingLocale$
    .pipe(
      map((list: Set<TLocale>): boolean => list.size === 0),
      distinctUntilChanged()
    )
    .subscribe((v: boolean): void => void ready$.next(v));

  locale$
    .pipe(
      distinctUntilChanged(),
      concatMap((locale: TLocale) => from(loadLocale(locale)).pipe(map((): IntlShape<string> => getIntl(locale))))
    )
    .subscribe((intl: IntlShape<string>): void => void intl$.next(intl));

  return {
    translate: (id: string, params?: Record<string, string>): string | never => {
      const intl = intl$.value;
      if (isDefined(intl)) {
        const defaultMessage = (loaded.get(defaultLocale) ?? {})[id] ?? id;
        return intl.formatMessage({ id, defaultMessage }, params);
      }
      throw new Error(`[TranslateService]: The service is not ready. At id "${id}"`);
    },
    formatDate: (value: Date | number, options?: FormatDateOptions): string | never => {
      const intl = intl$.value;
      if (isDefined(intl)) return intl.formatDate(value, options);
      throw new Error(`[TranslateService]: The service is not ready. At the value "${value}"`);
    },
    formatNumber: (value: number, options?: FormatNumberOptions): string | never => {
      const intl = intl$.value;
      if (isDefined(intl)) return intl.formatNumber(value, options);
      throw new Error(`[TranslateService]: The service is not ready. At the value "${value}"`);
    },
    ready$,
    locale$
  };
}
