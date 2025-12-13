import { enUs, nlNl } from '@Anarchy/i18n';
import type { TLocaleWithFont, TShowcaseLocales } from '@Showcases/Shared/Models';

const font: string = `"Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;

export const ShowcasesLocales: TShowcaseLocales = {
  'en-US': { ...enUs, font },
  'nl-NL': { ...nlNl, font: `"LongCang"` } // Just for dev purposes, normally it should be as close the same font as the default (Noto Sans)
};

export const ShowcasesFallbackLocale: TLocaleWithFont = { ...enUs, font };
