import type { AllowedLegalDocNames } from '@Showcases/Shared/Constants';

import type { TShowcaseLocaleIds } from '../../../showcases-i18n/src/Models/TShowcaseLocaleIds';

export type TLoadDocPayload = Readonly<{
  name: AllowedLegalDocNames;
  locale?: TShowcaseLocaleIds;
}>;
