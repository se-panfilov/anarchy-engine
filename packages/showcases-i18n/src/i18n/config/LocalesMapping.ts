import type { TLocalesMapping } from '@Anarchy/i18n';
import { enUs, nlNl } from '@Anarchy/i18n';

export const locales: TLocalesMapping = {
  [enUs.id as 'en-US']: () => import(`@Showcases/i18n/i18n/locales/${enUs.id}.json`).then((m) => m.default ?? m),
  [nlNl.id as 'nl-NL']: () => import(`@Showcases/i18n/i18n/locales/${nlNl.id}.json`).then((m) => m.default ?? m)
} as const;
