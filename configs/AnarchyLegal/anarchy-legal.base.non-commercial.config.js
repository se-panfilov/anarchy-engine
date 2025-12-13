import base from './anarchy-legal.base.config.js';

const legalFolderConfig = { relativeOutput: './legal' };

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
  DISCLAIMER: { ...legalFolderConfig, template: 'DISCLAIMER_TEMPLATE' },
  EULA: { ...legalFolderConfig, template: 'EULA_NON_COMMERCIAL_TEMPLATE' },
  PRIVACY: { ...legalFolderConfig, template: 'PRIVACY_NON_COMMERCIAL_TEMPLATE' },
  SECURITY: { ...legalFolderConfig, template: 'SECURITY_NON_COMMERCIAL_TEMPLATE' }
};
