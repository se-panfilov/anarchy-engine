import type { TTranslationService } from '@hellpig/anarchy-i18n';
import { TranslationService } from '@hellpig/anarchy-i18n';
import { InitialLocale, ShowcasesFallbackLocale } from '@Showcases/i18n/Constants';
import { locales } from '@Showcases/i18n/i18n';

export const showcasesTranslationService: TTranslationService = TranslationService(InitialLocale, ShowcasesFallbackLocale, locales);
