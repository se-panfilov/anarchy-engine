import type { TShowcaseLocaleIds } from './TShowcaseLocaleIds';

export type TLoadDocPayload = Readonly<{
  name: string;
  locale?: TShowcaseLocaleIds;
}>;
