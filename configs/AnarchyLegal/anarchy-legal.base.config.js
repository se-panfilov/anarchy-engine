// TODO DESKTOP: LEGAL: Actually, we can use constants here (GENERIC, DISCLAIMER, EULA, PRIVACY, SECURITY) and other values (Software, Project, etc.)

//Base config for Anarchy Legal docs generator (with common defaults).
export default {
  GENERIC: {
    messages: {
      // CONFIGS
      HAS_DPO: false,
      HAS_OSS_SIBLING: true,
      PROHIBIT_HIGH_RISK_USE: true,
      SBOM_AVAILABLE: false,
      MOD_HOSTING: false,
      ALLOW_PERSONAL_SHARING: true,
      ALLOW_COMMERCIAL_RESALE: true,
      IS_CHILD_DIRECTED: false,
      SHOW_TECH_IDENTIFIERS: true,
      TRADEMARK_SYMBOL: '', //Empty by default. Possible '™' (no obligations, just an indication it's a trademark) or '®' (registered trademark, which requires registration in the country of use).
      PRODUCT_TERM: 'Software', //E.g. 'Software', 'Product', 'Game', etc.
      STORE_DISCLOSURES: true,
      LEGAL_FOLDER: './legal/',
      PATH_TO_CE_MARK: 'ce-mark.png',

      //DATA COLLECTION
      CRASH_OPT_IN: false,

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
      LEGAL_ENTITY_NAME: 'Sergei Aleksandrovich Panfilov',

      //CONTACTS
      SUPPORT_EMAIL: 'TBD until market release',
      LEGAL_EMAIL: 'TBD until market release',
      PRIVACY_EMAIL: 'TBD until market release',
      SECURITY_EMAIL: 'TBD until market release',
      DPO_EMAIL: 'TBD until market release',
      EU_REPRESENTATIVE_CONTACT: 'TBD until market release',
      CHINA_REPRESENTATIVE_CONTACT: 'TBD until market release',
      ACCESSIBILITY_CONTACT: 'TBD until market release',

      // EULA (commercial)

      // personal and commercial — default for games/builds when you don't want to restrict usage.
      // personal - if you want a free promo build for private use only (streamers/events may fall under "commercial").
      // any lawful purposes – super broad formula; acceptable, but redundant (lawfulness is already required).
      // internal business purposes —  for closed B2B tools/editors (not for games).
      // evaluation purposes only – for demo/beta, if you want to explicitly limit to evaluation.
      // educational and research — for educational and research editions.
      USAGE_SCOPE: 'personal and commercial',
      IS_GAME: false, //If it's a videogame, add game-specific messages, e.g. no cheating, etc.

      //CRA (commercial)
      HAS_NOTIFIED_BODY: false, //only for critical software, e.g. medical devices, automotive, etc.
      CE_MARK_PLACEMENT: 'in-product Legal/About screen and documentation; on physical media/packaging where used',
      CONFORMITY_ASSESSMENT_ROUTE: 'internal control',
      IR_RECORD_RETENTION_MONTH: 24,
      PRODUCT_SHORT_PURPOSE: 'interactive entertainment software and its platform-specific client applications, intended for personal use in non-safety-critical environments',

      NETWORK_REQUIREMENT: 'not required for offline play; occasional connectivity may be needed for updates or optional online features',

      //SECURITY
      HAS_OFFICIAL_CHANNELS_LIST: false,

      //GDPR
      SUPPORT_EMAILS_RETAIN_PERIOD_MONTH: 24,

      // TBD
      SECURITY_SUPPORT_PERIOD_MONTH: 24,
      EFFECTIVE_DATE: 'TBD until market release'
    }
  }
};
