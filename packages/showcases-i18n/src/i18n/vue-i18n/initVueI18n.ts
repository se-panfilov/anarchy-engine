import { InitialLocale, ShowcasesFallbackLocale } from '@Showcases/i18n/Constants';
import type { I18n } from 'vue-i18n';
import { createI18n } from 'vue-i18n';

export function initVueI18n(): I18n {
  return createI18n({
    legacy: false,
    locale: InitialLocale.id,
    fallbackLocale: ShowcasesFallbackLocale.id
  });
}
