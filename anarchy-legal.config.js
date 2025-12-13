import base from './anarchy-legal-base.config.js';

//Non-Commercial configuration for legal docs
export default {
  GENERIC: {
    messages: {
      ...base.GENERIC.messages,

      PRODUCT_TERM: 'Project',
      STORE_DISCLOSURES: false
    }
  },
  DISCLAIMER: {},
  EULA: {
    template: 'EULA_NON_COMMERCIAL_TEMPLATE'
  },
  PRIVACY: {
    template: 'PRIVACY_NON_COMMERCIAL_TEMPLATE'
  },
  SECURITY: {
    template: 'SECURITY_NON_COMMERCIAL_TEMPLATE'
  }
};
