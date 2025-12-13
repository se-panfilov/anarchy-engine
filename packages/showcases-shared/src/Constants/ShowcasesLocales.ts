import type { TLocale } from '@Anarchy/i18n';
import { enUs, nlNl } from '@Anarchy/i18n';

export const ShowcasesLocales: Partial<Record<TLocale['id'], TLocale>> = {
  [enUs.id]: enUs,
  [nlNl.id]: nlNl
};
