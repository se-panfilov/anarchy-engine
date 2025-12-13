import type { IntlCache, IntlShape } from '@formatjs/intl';
import { createIntl, createIntlCache } from '@formatjs/intl';
import { BehaviorSubject } from 'rxjs';

export type TLocale = 'en' | 'nl' | 'fr';
export type TMessages = Readonly<Record<string, string>>;
export type TMessagesByLocale = Readonly<Record<TLocale, TMessages>>;
export type TParams = Readonly<Record<string, unknown>>;

export type TTranslateService = Readonly<{
  translate: (id: string, params?: TParams) => string;
  formatDate: (value: Date | number, opts?: Intl.DateTimeFormatOptions) => string;
  formatNumber: (value: number, opts?: Intl.NumberFormatOptions) => string;
  locale$: BehaviorSubject<TLocale>;
}>;

export function TranslateService(initialLocale: TLocale, fallbackLocale: TLocale, messagesByLocale: TMessagesByLocale): TTranslateService {
  const cache: IntlCache = createIntlCache();
  const locale$: BehaviorSubject<TLocale> = new BehaviorSubject<TLocale>(initialLocale);
  const intlByLocale: Map<TLocale, IntlShape<string>> = new Map<TLocale, IntlShape<string>>();

  function getIntl(locale: TLocale): IntlShape<string> {
    const hit: IntlShape<string> | undefined = intlByLocale.get(locale);
    if (hit) return hit;

    const current = messagesByLocale[locale] ?? {};
    const merged = { ...(messagesByLocale[fallbackLocale] ?? {}), ...current };
    const intl: IntlShape<string> = createIntl({ locale: locale, messages: merged }, cache);
    intlByLocale.set(locale, intl);
    return intl;
  }

  function translate(id: string, params?: TParams): string {
    const intl: IntlShape<string> = getIntl(locale$.value);
    const fallbackMessage: string = messagesByLocale[fallbackLocale]?.[id] ?? id;
    try {
      return intl.formatMessage({ id, defaultMessage: fallbackMessage }, params);
    } catch {
      console.warn(`[TranslateService]: Missing translation for "${id}" in locale "${locale$.value}". Using fallback: "${fallbackMessage}"`);
      return fallbackMessage;
    }
  }

  const formatDate = (value: Date | number, opts?: Intl.DateTimeFormatOptions): string => getIntl(locale$.value).formatDate(value, opts);
  const formatNumber = (value: number, opts?: Intl.NumberFormatOptions): string => getIntl(locale$.value).formatNumber(value, opts);

  getIntl(locale$.value);

  return { translate, formatDate, formatNumber, locale$ };
}

// export const messagesEn = {
//   'menu.start': 'Start',
//   'hud.fps': 'FPS: {count}',
//   'money.amount': '{val, number, ::currency/EUR}'
// } as const;
//
// export const messagesNL = {
//   'menu.start': 'Starten',
//   'hud.fps': 'FPS: {count}',
//   'money.amount': '{val, number, ::currency/EUR}'
// };
//
// export const i18n = TranslateService('en', 'en', {
//   en: messagesEn,
//   nl: messagesNL,
//   fr: {}
// });
//
// console.log(i18n.translate('menu.start'));
// console.log(i18n.translate('hud.fps', { count: 60 }));
// console.log(i18n.formatDate(new Date()));
// console.log(i18n.formatNumber(123456.789));
//
// i18n.locale$.next('nl');
//
// console.log(i18n.translate('menu.start'));
// console.log(i18n.translate('hud.fps', { count: 60 }));
// console.log(i18n.formatDate(new Date()));
// console.log(i18n.formatNumber(123456.789));
