import type { TLocalesMapping } from '@Anarchy/i18n';
import type { Locales } from '@Showcases/Shared';

export const locales: TLocalesMapping<Locales> = {
  en: () => import('@Showcases/Menu/i18n/locales/en.json').then((m) => m.default ?? m),
  nl: () => import('@Showcases/Menu/i18n/locales/nl.json').then((m) => m.default ?? m)
} as const;
