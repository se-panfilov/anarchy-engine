import type { FormatNumberOptions, IntlCache, IntlShape } from '@formatjs/intl';
import { createIntl, createIntlCache } from '@formatjs/intl';
import type { FormatDateOptions } from '@formatjs/intl/src/types';
import { isDefined, omitInArray } from '@Shared/Utils';
import { BehaviorSubject, concatMap, distinctUntilChanged, from, map } from 'rxjs';

export type TMessages = Record<string, string>;

export type TTranslateService<TLocale extends string> = Readonly<{
  translate: (id: string, params?: Record<string, string>) => string | never;
  formatDate: (value: Date | number, options?: FormatDateOptions) => string;
  formatNumber: (value: number, options?: FormatNumberOptions) => string;
  locale$: BehaviorSubject<TLocale>;
  ready$: BehaviorSubject<boolean>;
}>;

export type TLocaleLoaders<L extends string> = Record<L, () => Promise<TMessages>>;

export function TranslateService<TLocale extends string>(initialLocale: TLocale, defaultLocale: TLocale, locales: TLocaleLoaders<TLocale>): TTranslateService<TLocale> {
  const cache: IntlCache = createIntlCache();
  const ready$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const locale$: BehaviorSubject<TLocale> = new BehaviorSubject<TLocale>(initialLocale);
  const loaded: Map<TLocale, TMessages> = new Map<TLocale, TMessages>();
  const intlMap: Map<TLocale, IntlShape<string>> = new Map<TLocale, IntlShape<string>>();
  const intl$: BehaviorSubject<IntlShape<string> | undefined> = new BehaviorSubject<IntlShape<string> | undefined>(undefined);

  function getIntl(locale: TLocale): IntlShape<string> {
    if (intlMap.has(locale)) return intlMap.get(locale)!;

    const current: TMessages = loaded.get(locale) ?? {};
    const fallback: TMessages = loaded.get(defaultLocale) ?? {};
    const intl: IntlShape<string> = createIntl({ locale, defaultLocale, messages: { ...fallback, ...current } }, cache);

    intlMap.set(locale, intl);

    return intl;
  }

  const loadingLocale$: BehaviorSubject<ReadonlyArray<TLocale>> = new BehaviorSubject<ReadonlyArray<TLocale>>([initialLocale, defaultLocale]);

  async function loadLocale(locale: TLocale): Promise<void> {
    loadingLocale$.next([...loadingLocale$.value, locale]);
    if (!loaded.has(locale)) loaded.set(locale, await locales[locale]());
    intl$.next(getIntl(locale));
    loadingLocale$.next(omitInArray(loadingLocale$.value, locale));
  }

  loadingLocale$
    .pipe(
      map((list: ReadonlyArray<TLocale>): boolean => list.length === 0),
      distinctUntilChanged()
    )
    .subscribe((v: boolean) => ready$.next(v));

  locale$
    .pipe(
      distinctUntilChanged(),
      concatMap((locale: TLocale) => from(loadLocale(locale)).pipe(map((): IntlShape<string> => getIntl(locale))))
    )
    .subscribe((intl: IntlShape<string>) => void intl$.next(intl));

  return {
    translate: (id: string, params?: Record<string, string>): string | never => {
      if (isDefined(intl$.value)) return intl$.value.formatMessage({ id }, params);
      throw new Error(`[TranslateService]: The service is not ready. At id "${id}"`);
    },
    formatDate: (value: Date | number, options?: FormatDateOptions): string | never => {
      if (isDefined(intl$.value)) return intl$.value.formatDate(value, options);
      throw new Error(`[TranslateService]: The service is not ready. At the value "${value}"`);
    },
    formatNumber: (value: number, options?: FormatNumberOptions): string | never => {
      if (isDefined(intl$.value)) return intl$.value.formatNumber(value, options);
      throw new Error(`[TranslateService]: The service is not ready. At the value "${value}"`);
    },
    ready$,
    locale$
  };
}
