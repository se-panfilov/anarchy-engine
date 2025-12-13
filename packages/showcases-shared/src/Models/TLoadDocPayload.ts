import type { AllowedLegalDocNames } from '@Showcases/Shared/Constants';

import type { TShowcaseLocaleIds } from './TShowcaseLocaleIds';

export type TLoadDocPayload = Readonly<{
  name: AllowedLegalDocNames;
  locale?: TShowcaseLocaleIds;
}>;
