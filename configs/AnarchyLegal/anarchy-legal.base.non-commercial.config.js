import base from './anarchy-legal.base.config.js';

//Non-Commercial configuration preset for legal docs
export default {
  ...base,
  GENERIC: {
    ...base.GENERIC,
    messages: {
      ...base.GENERIC.messages,

      PRODUCT_TERM: 'Project',
      STORE_DISCLOSURES: false
    }
  },

  //Root
  NOTICE: { template: 'NOTICE_SLIM_NON_COMMERCIAL_TEMPLATE' },

  //LEGAL folder (include in a package/binary)
  DISCLAIMER: { template: 'DISCLAIMER_TEMPLATE', relativeOutput: './legal' },
  EULA: { template: 'EULA_NON_COMMERCIAL_TEMPLATE', relativeOutput: './legal' },
  PRIVACY: { template: 'PRIVACY_NON_COMMERCIAL_TEMPLATE', relativeOutput: './legal' },
  SECURITY: { template: 'SECURITY_NON_COMMERCIAL_TEMPLATE', relativeOutput: './legal' }
};
