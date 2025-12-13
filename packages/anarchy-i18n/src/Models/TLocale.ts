import type { TEnglishName, TLanguageCode, TLocaleId, TNativeName, TRegionCode, TScriptCode } from './TLocales.gen';

export type TLocale = Readonly<{
  id: TLocaleId; // BCP47, e.g. 'en-US'
  languageCode: TLanguageCode; // 'en' (ISO 639-1)
  regionCode?: TRegionCode; // 'US' (ISO 3166-1 alpha-2)
  // eslint-disable-next-line spellcheck/spell-checker
  scriptCode?: TScriptCode; // 'Latn' | 'Cyrl' | 'Hans' |
  englishName: TEnglishName;
  nativeName: TNativeName;
  direction: 'ltr' | 'rtl';
  font?: string; // Optional. To let the app change font depending on lang/locale
}>;
