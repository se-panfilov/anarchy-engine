import type { TLocale } from '@Anarchy/i18n';
import { enUs, nlNl } from '@Anarchy/i18n';

// TODO DESKTOP: extract types?
export type TShowcaseLocaleIds = 'en-US' | 'nl-NL';
export type TShowcaseLocales = Record<TShowcaseLocaleIds, TLocale>;
// export type TShowcaseLocale = typeof enUs | typeof nlNl;

export const ShowcasesLocales: TShowcaseLocales = {
  'en-US': enUs,
  'nl-NL': nlNl
};
