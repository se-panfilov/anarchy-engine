import type { TShowcaseLocaleIds } from 'showcases-shared';

export type TLoadDocPayload = Readonly<{
  name: string;
  locale?: TShowcaseLocaleIds;
}>;
