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
  DISCLAIMER: {},
  EULA: {
    template: 'EULA_COMMERCIAL_TEMPLATE'
  },
  PRIVACY: {
    template: 'PRIVACY_COMMERCIAL_TEMPLATE'
  },
  SECURITY: {
    template: 'SECURITY_COMMERCIAL_TEMPLATE'
  }
};
