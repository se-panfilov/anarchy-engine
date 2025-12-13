import { enUs, nlNl } from '@Anarchy/i18n';
import type { TLocaleWithFont, TShowcaseLocales } from '@Showcases/Shared/Models';

const font: string = `"Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;

export const ShowcasesLocales: TShowcaseLocales = {
  'en-US': { ...enUs, font },
  // A special font is used only for  dev purposes,normally it should be as close the same font as the default (Noto Sans)
  // remove it in production and clean up the code packages/showcases-shared/src/assets/_fonts.scss
  'nl-NL': { ...nlNl, font: `"LongCang"` }
};
export const ShowcasesFallbackLocale: TLocaleWithFont = { ...enUs, font };
