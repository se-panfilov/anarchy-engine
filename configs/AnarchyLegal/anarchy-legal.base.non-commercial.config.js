import base from './anarchy-legal.base.config.js';

//Non-Commercial configuration preset for legal docs
export default {
  GENERIC: {
    messages: {
      ...base.GENERIC.messages,

      PRODUCT_TERM: 'Project',
      STORE_DISCLOSURES: false
    }
  },
  DISCLAIMER: { template: 'DISCLAIMER_TEMPLATE' },
  EULA: { template: 'EULA_COMMERCIAL_TEMPLATE', relativeOutput: './legal' },
  NOTICE: { template: 'NOTICE_SLIM_TEMPLATE' },
  PRIVACY: { template: 'PRIVACY_COMMERCIAL_TEMPLATE', relativeOutput: './legal' },
  SECURITY: { template: 'SECURITY_COMMERCIAL_TEMPLATE', relativeOutput: './legal' }
};
