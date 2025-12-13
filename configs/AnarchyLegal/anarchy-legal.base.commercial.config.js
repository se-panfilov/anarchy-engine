import base from './anarchy-legal.base.config.js';

//Commercial configuration preset for legal docs
export default {
  ...base,
  GENERIC: {
    ...base.GENERIC,
    messages: {
      ...base.GENERIC.messages,

      SHOW_TECH_IDENTIFIERS: true
    }
  },

  //Root
  NOTICE: { template: 'NOTICE_SLIM_COMMERCIAL_TEMPLATE' },

  //LEGAL folder (include in a package/binary)
  DISCLAIMER: { template: 'DISCLAIMER_TEMPLATE', relativeOutput: './legal' },
  EULA: { template: 'EULA_COMMERCIAL_TEMPLATE', relativeOutput: './legal' },
  INSTRUCTIONS: { template: 'INSTRUCTIONS_TEMPLATE', relativeOutput: './legal' },
  PRIVACY: { template: 'PRIVACY_COMMERCIAL_TEMPLATE', relativeOutput: './legal' },
  SECURITY: { template: 'SECURITY_COMMERCIAL_TEMPLATE', relativeOutput: './legal' },
  SUPPORT: { template: 'SUPPORT_COMMERCIAL_TEMPLATE', relativeOutput: './legal' },

  //
  EU_DECLARATION_OF_CONFORMITY: { template: 'EU_DECLARATION_OF_CONFORMITY_COMMERCIAL_TEMPLATE', relativeOutput: './compliance' },

  //COMPLIANCE folder (do not include in a package/binary)
  TECHNICAL_DOCUMENTATION: { template: 'TECHNICAL_DOCUMENTATION_COMMERCIAL_TEMPLATE', relativeOutput: './compliance' }
};
