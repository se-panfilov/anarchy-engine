import type { TWithName, TWithTags } from '@hellpig/anarchy-engine/Mixins';

export type TAbstractResourceConfig = Readonly<{
  url: string;
  isForce?: boolean;
  options?: Record<string, any>;
}> &
  TWithName &
  TWithTags;
