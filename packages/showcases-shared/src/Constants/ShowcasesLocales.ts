import type { TLocale } from '@Anarchy/i18n';
import { enUs, nlNl } from '@Anarchy/i18n';

export type TShowcaseLocaleIds = 'en-US' | 'nl-NL';

export const ShowcasesLocales: Record<TShowcaseLocaleIds, TLocale> = {
  'en-US': enUs,
  'nl-NL': nlNl
};
