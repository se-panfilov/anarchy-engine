import base from '../../anarchy-legal-base.config.js';

//Commercial configuration for legal docs
export default {
  GENERIC: {
    messages: {
      ...base.GENERIC.messages,

      //The brand name of the product (registered trademark)
      PRODUCT_DISPLAY_NAME: 'TBD until market release',
      SHOW_TECH_IDENTIFIERS: true,
      IS_GAME: true
    }
  },
  DISCLAIMER: { template: 'DISCLAIMER_TEMPLATE' },
  EULA: { template: 'EULA_COMMERCIAL_TEMPLATE' },
  EU_DECLARATION_OF_CONFORMITY: { template: 'EU_DECLARATION_OF_CONFORMITY_COMMERCIAL_TEMPLATE' },
  INSTRUCTIONS: { template: 'INSTRUCTIONS_TEMPLATE' },
  PRIVACY: { template: 'PRIVACY_COMMERCIAL_TEMPLATE' },
  SECURITY: { template: 'SECURITY_COMMERCIAL_TEMPLATE' },
  SUPPORT: { template: 'SUPPORT_COMMERCIAL_TEMPLATE' },
  TECHNICAL_DOCUMENTATION: { template: 'TECHNICAL_DOCUMENTATION_COMMERCIAL_TEMPLATE' },
  VULN_HANDLING: { template: 'VULN_HANDLING_COMMERCIAL_TEMPLATE' }
};
