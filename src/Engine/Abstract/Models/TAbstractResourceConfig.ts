import type { TWithName, TWithReadonlyTags } from '@/Engine/Mixins';

export type TAbstractResourceConfig = Readonly<{
  url: string;
  isForce?: boolean;
  options?: Record<string, any>;
}> &
  TWithName &
  TWithReadonlyTags;
