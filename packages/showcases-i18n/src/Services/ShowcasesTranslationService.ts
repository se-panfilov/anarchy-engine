import type { TTranslationService } from '@Anarchy/i18n';
import { TranslationService } from '@Anarchy/i18n';
import { InitialLocale, ShowcasesFallbackLocale } from '@Showcases/i18n/Constants';
import { locales } from '@Showcases/i18n/i18n';

export const showcasesTranslationService: TTranslationService = TranslationService(InitialLocale, ShowcasesFallbackLocale, locales);
