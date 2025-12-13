import commercialBase from '../../configs/AnarchyLegal/anarchy-legal.base.commercial.config.js';
import { ShowcasesDisplayName, ShowcasesSoftwareFamilyName, ShowcasesSupportedPlatforms, ShowcasesSystemRequirements } from '../../packages/showcases-shared/src/Legal/ShowcasesLegalConstants.js';

//Commercial configuration for legal docs
export default {
  ...commercialBase,
  GENERIC: {
    messages: {
      ...commercialBase.GENERIC.messages,

      //The brand name of the product (registered trademark)
      PRODUCT_DISPLAY_NAME: ShowcasesDisplayName,
      IS_GAME: true,

      SUPPORTED_PLATFORMS: ShowcasesSupportedPlatforms.Desktop,
      MIN_SYSTEM_REQUIREMENTS: ShowcasesSystemRequirements.Desktop.Minimum,
      REC_SYSTEM_REQUIREMENTS: ShowcasesSystemRequirements.Desktop.Recommended,
      PRODUCT_TYPE_OR_MODEL: ShowcasesSoftwareFamilyName
    }
  }
};
