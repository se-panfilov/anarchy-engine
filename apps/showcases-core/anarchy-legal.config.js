import commercialBase from '../../configs/AnarchyLegal/anarchy-legal.base.commercial.config.js';
import { ShowcasesSoftwareFamilyName, ShowcasesSupportedPlatforms, ShowcasesSystemRequirements } from '../../packages/showcases-shared/src/Legal/ShowcasesLegalConstants.js'; //Commercial configuration for legal docs

//Commercial configuration for legal docs
export default {
  ...commercialBase,
  GENERIC: {
    messages: {
      ...commercialBase.GENERIC.messages,

      //The brand name of the product (registered trademark)
      PRODUCT_DISPLAY_NAME: 'TBD until market release',
      IS_GAME: true,

      SUPPORTED_PLATFORMS: ShowcasesSupportedPlatforms.Web,
      MIN_SYSTEM_REQUIREMENTS: ShowcasesSystemRequirements.Web.Minimum,
      REC_SYSTEM_REQUIREMENTS: ShowcasesSystemRequirements.Web.Recommended,
      PRODUCT_TYPE_OR_MODEL: ShowcasesSoftwareFamilyName
    }
  }
};
