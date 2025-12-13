import base from './anarchy-legal.base.config.js';

const rootFolderConfig = {
  messages: { SBOM_LOCATION: './compliance/sbom/' }
};

const legalFolderConfig = {
  relativeOutput: './legal',
  messages: { SBOM_LOCATION: '../compliance/sbom/' }
};

const complianceFolderConfig = {
  relativeOutput: './compliance',
  messages: { SBOM_LOCATION: './sbom/' }
};

//Commercial configuration preset for legal docs
export default {
  ...base,
  GENERIC: {
    ...base.GENERIC,
    messages: {
      ...base.GENERIC.messages,
      ...rootFolderConfig.messages,

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
      CONFORMITY_ASSESSMENT_ROUTE: 'internal control',
      IR_RECORD_RETENTION_MONTH: 24,
      PRODUCT_SHORT_PURPOSE: 'interactive entertainment software and its platform-specific client applications, intended for personal use in non-safety-critical environments',

      //Instructions (commercial)
      NETWORK_REQUIREMENT: 'not required for offline play; occasional connectivity may be needed for updates or optional online features',

      // SBOM
      SBOM_FORMAT: 'CycloneDX JSON',

      SHOW_TECH_IDENTIFIERS: true
    }
  },

  //Root
  NOTICE: { template: 'NOTICE_SLIM_COMMERCIAL_TEMPLATE' },

  //LEGAL folder (include in a package/binary)
  DISCLAIMER: { ...legalFolderConfig, template: 'DISCLAIMER_TEMPLATE' },
  EULA: { ...legalFolderConfig, template: 'EULA_COMMERCIAL_TEMPLATE' },
  INSTRUCTIONS: { ...legalFolderConfig, template: 'INSTRUCTIONS_TEMPLATE' },
  PRIVACY: { ...legalFolderConfig, template: 'PRIVACY_COMMERCIAL_TEMPLATE' },
  SECURITY: { ...legalFolderConfig, template: 'SECURITY_COMMERCIAL_TEMPLATE' },
  SUPPORT: { ...legalFolderConfig, template: 'SUPPORT_COMMERCIAL_TEMPLATE' },
  SBOM_POINTER: { ...legalFolderConfig, template: 'SBOM_COMMERCIAL_POINTER' },

  //COMPLIANCE folder (do not include in a package/binary)
  EU_DECLARATION_OF_CONFORMITY: { ...complianceFolderConfig, template: 'EU_DECLARATION_OF_CONFORMITY_COMMERCIAL_TEMPLATE' },
  TECHNICAL_DOCUMENTATION: { ...complianceFolderConfig, template: 'TECHNICAL_DOCUMENTATION_COMMERCIAL_TEMPLATE' },
  VULN_HANDLING: { ...complianceFolderConfig, template: 'VULN_HANDLING_COMMERCIAL_TEMPLATE', messages: { SBOM_LOCATION: './sbom/' } }
};
