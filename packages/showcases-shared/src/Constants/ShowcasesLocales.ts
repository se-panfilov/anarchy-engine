/* eslint-disable spellcheck/spell-checker */
import { enUs, nlNl } from '@Anarchy/i18n';
import type { TLocaleWithFont, TShowcaseLocales } from '@Showcases/Shared/Models';

const font: string = `"Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;

// Full list of locales is based on packages/anarchy-i18n/src/Constants/Locales.gen.ts
export const ShowcasesLocales: TShowcaseLocales = {
  // IMPORTANT!!!: NL uses a special font only for dev purposes.
  // Remove it in production and clean up the code packages/showcases-shared/src/assets/_fonts.scss
  'nl-NL': { ...nlNl, font: `"LongCang"` },

  // ===== UNIVERSAL LATIN + GREEK + CYRILLIC + VIETNAMESE =====
  // 'af-ZA': { ...afZa, font },
  // 'az-Latn-AZ': { ...azLatnAz, font },
  // 'bs-BA': { ...bsBa, font },
  // 'ca-ES': { ...caEs, font },
  // 'cs-CZ': { ...csCz, font },
  // 'cy-GB': { ...cyGb, font },
  // 'da-DK': { ...daDk, font },
  // 'de-AT': { ...deAt, font },
  // 'de-CH': { ...deCh, font },
  // 'de-DE': { ...deDe, font },
  // 'en-AU': { ...enAu, font },
  // 'en-CA': { ...enCa, font },
  // 'en-GB': { ...enGb, font },
  // 'en-IE': { ...enIe, font },
  // 'en-IN': { ...enIn, font },
  // 'en-NZ': { ...enNz, font },
  'en-US': { ...enUs, font }
  // 'en-ZA': { ...enZa, font },
  // 'es-AR': { ...esAr, font },
  // 'es-CL': { ...esCl, font },
  // 'es-CO': { ...esCo, font },
  // 'es-ES': { ...esEs, font },
  // 'es-MX': { ...esMx, font },
  // 'es-PE': { ...esPe, font },
  // 'es-US': { ...esUs, font },
  // 'et-EE': { ...etEe, font },
  // 'fi-FI': { ...fiFi, font },
  // 'fil-PH': { ...filPh, font },
  // 'fr-BE': { ...frBe, font },
  // 'fr-CA': { ...frCa, font },
  // 'fr-CH': { ...frCh, font },
  // 'fr-FR': { ...frFr, font },
  // 'ga-IE': { ...gaIe, font },
  // 'gl-ES': { ...glEs, font },
  // 'hr-HR': { ...hrHr, font },
  // 'hu-HU': { ...huHu, font },
  // 'id-ID': { ...idId, font },
  // 'is-IS': { ...isIs, font },
  // 'it-CH': { ...itCh, font },
  // 'it-IT': { ...itIt, font },
  // 'jv-ID': { ...jvId, font },
  // 'lt-LT': { ...ltLt, font },
  // 'lv-LV': { ...lvLv, font },
  // 'ms-MY': { ...msMy, font },
  // 'nb-NO': { ...nbNo, font },
  // 'nn-NO': { ...nnNo, font },
  // 'nl-BE': { ...nlBe, font },
  // 'nl-NL': { ...nlNl, font }, //  Using special font for dev purposes only
  // 'pl-PL': { ...plPl, font },
  // 'pt-BR': { ...ptBr, font },
  // 'pt-PT': { ...ptPt, font },
  // 'ro-RO': { ...roRo, font },
  // 'sk-SK': { ...skSk, font },
  // 'sl-SI': { ...slSi, font },
  // 'sq-AL': { ...sqAl, font },
  // 'sr-Cyrl-RS': { ...srCyrlRs, font },
  // 'sr-Latn-RS': { ...srLatnRs, font },
  // 'sv-FI': { ...svFi, font },
  // 'sv-SE': { ...svSe, font },
  // 'sw-KE': { ...swKe, font },
  // 'tr-TR': { ...trTr, font },
  // 'vi-VN': { ...viVn, font },
  // 'zu-ZA': { ...zuZa, font },
  // 'be-BY': { ...beBy, font },
  // 'bg-BG': { ...bgBg, font },
  // 'ru-RU': { ...ruRu, font },
  // 'uk-UA': { ...ukUa, font },
  // 'el-GR': { ...elGr, font },

  // ===== ARABIC SCRIPT =====
  // 'ar-SA': { ...arSa, font: `"Noto Sans Arabic"` },
  // 'fa-IR': { ...faIr, font: `"Noto Sans Arabic"` },
  // 'az-Arab-IR': { ...azArabIr, font: `"Noto Sans Arabic"` },
  // 'ur-PK': { ...urPk, font: `"Noto Nastaliq Urdu"` },

  // ===== HEBREW =====
  // 'he-IL': { ...heIl, font: `"Noto Sans Hebrew"` },

  // ===== DEVANAGARI =====
  // 'hi-IN': { ...hiIn, font: `"Noto Sans Devanagari"` },
  // 'mr-IN': { ...mrIn, font: `"Noto Sans Devanagari"` },
  // 'ne-NP': { ...neNp, font: `"Noto Sans Devanagari"` },

  // ===== BENGALI =====
  // 'bn-BD': { ...bnBd, font: `"Noto Sans Bengali"` },
  // 'bn-IN': { ...bnIn, font: `"Noto Sans Bengali"` },

  // ===== GURMUKHI =====
  // 'pa-IN': { ...paIn, font: `"Noto Sans Gurmukhi"` },

  // ===== GUJARATI =====
  // 'gu-IN': { ...guIn, font: `"Noto Sans Gujarati"` },

  // ===== KANNADA =====
  // 'kn-IN': { ...knIn, font: `"Noto Sans Kannada"` },

  // ===== MALAYALAM =====
  // 'ml-IN': { ...mlIn, font: `"Noto Sans Malayalam"` },

  // ===== SINHALA =====
  // 'si-LK': { ...siLk, font: `"Noto Sans Sinhala"` },

  // ===== TAMIL =====
  // 'ta-IN': { ...taIn, font: `"Noto Sans Tamil"` },
  // 'ta-LK': { ...taLk, font: `"Noto Sans Tamil"` },

  // ===== THAI =====
  // 'th-TH': { ...thTh, font: `"Noto Sans Thai"` },

  // ===== KHMER =====
  // 'km-KH': { ...kmKh, font: `"Noto Sans Khmer"` },

  // ===== LAO =====
  // 'lo-LA': { ...loLa, font: `"Noto Sans Lao"` },

  // ===== ETHIOPIC (AMHARIC) =====
  // 'am-ET': { ...amEt, font: `"Noto Sans Ethiopic"` },

  // ===== Chinese =====
  // 'zh-Hans-CN': { ...zhHansCn, font: `"Noto Sans SC"` },
  // 'zh-Hans-SG': { ...zhHansSg, font: `"Noto Sans SC"` },
  // 'zh-Hant-HK': { ...zhHantHk, font: `"Noto Sans HK"` },
  // 'zh-Hant-TW': { ...zhHantTw, font: `"Noto Sans TC"` },

  // ===== Japanese =====
  // 'ja-JP': { ...jaJp, font: `"Noto Sans JP"` },

  // ===== Korean =====
  // 'ko-KR': { ...koKr, font: `"Noto Sans KR"` }
};
export const ShowcasesFallbackLocale: TLocaleWithFont = { ...enUs, font };
