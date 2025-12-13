import type { TLocalesMapping } from '@Anarchy/i18n';
import { enUs, nlNl } from '@Anarchy/i18n';

export const locales: TLocalesMapping = {
  'en-US': () => import(`@Showcases/Menu/i18n/locales/${enUs.id}.json`).then((m) => m.default ?? m),
  'nl-NL': () => import(`@Showcases/Menu/i18n/locales/${nlNl.id}.json`).then((m) => m.default ?? m)
} as const;
