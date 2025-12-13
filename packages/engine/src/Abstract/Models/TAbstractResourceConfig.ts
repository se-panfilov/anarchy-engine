import type { TWithName, TWithTags } from '@/Mixins';

export type TAbstractResourceConfig = Readonly<{
  url: string;
  isForce?: boolean;
  options?: Record<string, any>;
}> &
  TWithName &
  TWithTags;
