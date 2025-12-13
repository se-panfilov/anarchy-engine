export default [
  {
    type: 'GENERIC',
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

      //B2B
      LIABILITY_CAP_AMOUNT: 'the total fees paid by that Business User to the Licensor for the Game in the 12 months immediately preceding the event giving rise to the claim',

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

      // EULA (commercial)

      // personal and commercial — default for games/builds when you don't want to restrict usage.
      // personal - if you want a free promo build for private use only (streamers/events may fall under "commercial").
      // any lawful purposes – super broad formula; acceptable, but redundant (lawfulness is already required).
      // internal business purposes —  for closed B2B tools/editors (not for games).
      // evaluation purposes only – for demo/beta, if you want to explicitly limit to evaluation.
      // educational and research — for educational and research editions.
      USAGE_SCOPE: 'personal and commercial',

      // TBD
      SECURITY_SUPPORT_PERIOD: 'TBD until market release',
      EFFECTIVE_DATE: 'TBD until market release'
    }
  }
];
