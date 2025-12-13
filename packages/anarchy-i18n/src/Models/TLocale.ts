export type TLocale = Readonly<{
  id: string; // BCP47, e.g. 'en-US'
  languageCode: string; // 'en' (ISO 639-1)
  regionCode?: string; // 'US' (ISO 3166-1 alpha-2)
  // eslint-disable-next-line spellcheck/spell-checker
  scriptCode?: string; // 'Latn' | 'Cyrl' | 'Hans' |
  englishName: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
}>;
