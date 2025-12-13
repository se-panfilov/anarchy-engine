import type { TShowcaseLocaleIds } from '@Showcases/i18n';
import type { AllowedLegalDocNames } from '@Showcases/Shared/Constants';

export type TLoadDocPayload = Readonly<{
  name: AllowedLegalDocNames;
  locale?: TShowcaseLocaleIds;
}>;
