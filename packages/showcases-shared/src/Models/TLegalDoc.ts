import type { AllowedLegalDocNames } from '@Showcases/Shared/Constants';

export type TLegalDoc = Readonly<{
  name: AllowedLegalDocNames;
  content: string;
}>;
