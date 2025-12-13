import type { TLocale } from '@Anarchy/i18n';

import type { TFullLocaleIds, TShowcaseLocaleIds } from './TShowcaseLocaleIds';

//Locale with enforced font property
export type TLocaleWithFont = Omit<TLocale, 'font'> & Readonly<{ font: string }>;

export type TShowcaseLocales = Record<TShowcaseLocaleIds, TLocaleWithFont>;
export type TFullLocales = Record<TFullLocaleIds, TLocaleWithFont>;
