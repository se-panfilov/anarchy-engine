import { InitialLocale, ShowcasesFallbackLocale } from '@Showcases/i18n/Constants';
// import enUS from '@Showcases/i18n/i18n/locales/en-US.json';
// import nlNL from '@Showcases/i18n/i18n/locales/nl-NL.json';
import type { I18n } from 'vue-i18n';
import { createI18n } from 'vue-i18n';

export function initVueI18n(): I18n {
  return createI18n({
    legacy: false,
    // globalInjection: true,
    locale: InitialLocale.id,
    fallbackLocale: ShowcasesFallbackLocale.id
    // messages: {
    //   'en-US': enUS,
    //   'nl-NL': nlNL
    // }
  });
}
