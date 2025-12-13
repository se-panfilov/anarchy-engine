import base from './anarchy-legal.base.config.js';

//Commercial configuration preset for legal docs
export default {
  GENERIC: {
    messages: {
      ...base.GENERIC.messages,

      SHOW_TECH_IDENTIFIERS: true
    }
  },
  DISCLAIMER: { template: 'DISCLAIMER_TEMPLATE' },
  EULA: { template: 'EULA_COMMERCIAL_TEMPLATE', relativeOutput: './legal' },
  EU_DECLARATION_OF_CONFORMITY: { template: 'EU_DECLARATION_OF_CONFORMITY_COMMERCIAL_TEMPLATE', relativeOutput: './compliance' },
  INSTRUCTIONS: { template: 'INSTRUCTIONS_TEMPLATE', relativeOutput: './legal' },
  PRIVACY: { template: 'PRIVACY_COMMERCIAL_TEMPLATE', relativeOutput: './legal' },
  SECURITY: { template: 'SECURITY_COMMERCIAL_TEMPLATE', relativeOutput: './legal' },
  SUPPORT: { template: 'SUPPORT_COMMERCIAL_TEMPLATE', relativeOutput: './legal' },
  TECHNICAL_DOCUMENTATION: { template: 'TECHNICAL_DOCUMENTATION_COMMERCIAL_TEMPLATE' },
  VULN_HANDLING: { template: 'VULN_HANDLING_COMMERCIAL_TEMPLATE' }
};
