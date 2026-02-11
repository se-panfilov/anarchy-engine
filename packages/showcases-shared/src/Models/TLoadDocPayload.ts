import type { TShowcaseLocaleIds } from '@Showcases/I18N';
import type { AllowedLegalDocNames } from '@Showcases/Shared/Constants';

export type TLoadDocPayload = Readonly<{
  name: AllowedLegalDocNames;
  locale?: TShowcaseLocaleIds;
}>;
