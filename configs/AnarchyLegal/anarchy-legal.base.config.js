import { TradeMarkSymbol } from './Constants/TradeMarkSymbol.js';
import { ProductTerm } from './Constants/ProductTerm.js';

//Base config for Anarchy Legal docs generator (with common defaults).
export default {
  GENERIC: {
    messages: {
      // CONFIGS
      HAS_DPO: false,
      PROHIBIT_HIGH_RISK_USE: true,
      SBOM_AVAILABLE: false,
      MOD_HOSTING: false,
      ALLOW_PERSONAL_SHARING: true,
      ALLOW_COMMERCIAL_RESALE: true,
      IS_CHILD_DIRECTED: false,
      SHOW_TECH_IDENTIFIERS: true,
      TRADEMARK_SYMBOL: TradeMarkSymbol.None,
      PRODUCT_TERM: ProductTerm.Software,
      STORE_DISCLOSURES: true,
      LEGAL_FOLDER: './legal/',
      PATH_TO_CE_MARK: 'ce-mark.png',

      CRASH_RETENTION_DAYS: 90, //How long crash reports are stored on servers (if any). E.g. 90 days

      //B2B
      LIABILITY_CAP_AMOUNT: 'the total fees paid by that Business User to the Licensor for the Software in the 12 months immediately preceding the event giving rise to the claim',

      // REGIONS
      REGION_CN: true,
      HAS_CHINA_REP: false,
      HAS_EU_REP: false,

      //DEFAULTS
      EU_CHILD_CONSENT_AGE: 16,
      US_CHILD_AGE: 13,
      CN_CHILD_AGE: 14,
      GOVERNING_LAW_COUNTRY: 'The Netherlands',
      GOVERNING_VENUE: 'Amsterdam',

      // PERSONAL
      LEGAL_ENTITY_NAME: 'Sergei Panfilov',

      //CONTACTS
      SUPPORT_EMAIL: 'pnf036+anarchy@gmail.com',
      LEGAL_EMAIL: 'pnf036+anarchy@gmail.com',
      PRIVACY_EMAIL: 'pnf036+anarchy@gmail.com',
      SECURITY_EMAIL: 'pnf036+anarchy_security@gmail.com',
      DPO_EMAIL: 'none',
      EU_REPRESENTATIVE_CONTACT: 'none',
      CHINA_REPRESENTATIVE_CONTACT: 'none',
      ACCESSIBILITY_CONTACT: 'pnf036+anarchy@gmail.com',

      //SECURITY
      HAS_OFFICIAL_CHANNELS_LIST: false,

      //GDPR
      SUPPORT_EMAILS_RETAIN_PERIOD_MONTH: 24,

      // TBD
      EFFECTIVE_DATE: '11 January 2026'
    }
  }
};
