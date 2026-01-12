import commercialBase from '../../configs/AnarchyLegal/anarchy-legal.base.commercial.config.js';
import { ShowcasesDisplayName, ShowcasesSoftwareFamilyName, ShowcasesSupportedPlatforms, ShowcasesSystemRequirements } from '../../packages/showcases-shared/src/Legal/ShowcasesLegalConstants.js';

//Commercial configuration for legal docs
export default {
  ...commercialBase,
  GENERIC: {
    ...commercialBase.GENERIC,
    messages: {
      ...commercialBase.GENERIC.messages,
      //The brand name of the product (registered trademark)
      PRODUCT_DISPLAY_NAME: ShowcasesDisplayName,
      IS_GAME: true,

      SUPPORTED_PLATFORMS: ShowcasesSupportedPlatforms.Web,
      MIN_SYSTEM_REQUIREMENTS: ShowcasesSystemRequirements.Web.Minimum,
      REC_SYSTEM_REQUIREMENTS: ShowcasesSystemRequirements.Web.Recommended,
      PRODUCT_MODEL_CODE: ShowcasesSoftwareFamilyName,
      CONFORMITY_SERIES: '2.x.x (pre-market, no placement)', //A range of versions (major version) that matches of package.json, which were published commercially
      BASELINE_VERSION: '2.19.1', //First CE-market release version
      BASELINE_EFFECTIVE_DATE: 'TBD until market release', //The date of the first CE-market release
      INITIAL_RELEASE_DATE: 'TBD until market release' //The date of the first release (at lest in EU)
    }
  }
};
