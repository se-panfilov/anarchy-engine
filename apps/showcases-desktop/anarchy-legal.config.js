import commercialBase from '../../configs/AnarchyLegal/anarchy-legal.base.commercial.config.js';

//Commercial configuration for legal docs
export default {
  ...commercialBase,
  GENERIC: {
    messages: {
      ...commercialBase.GENERIC.messages,

      //The brand name of the product (registered trademark)
      PRODUCT_DISPLAY_NAME: 'TBD until market release',
      IS_GAME: true
    }
  }
};
