export default [
  {
    type: 'GENERIC',
    messages: {
      // CONFIGS
      HAS_DPO: false,
      PROHIBIT_HIGH_RISK_USE: true,
      SBOM_AVAILABLE: false,
      MOD_HOSTING: false,
      ALLOW_PERSONAL_SHARING: true,
      ALLOW_COMMERCIAL_RESALE: true,

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

      // TBD
      SECURITY_SUPPORT_PERIOD: 'TBD until market release',
      EFFECTIVE_DATE: 'TBD until market release'
    }
  }
];
