import type { TWithNameRequired, TWithReadonlyTags } from '@/Engine/Mixins';

export type TAbstractResourceConfig = Readonly<{
  url: string;
  isForce?: boolean;
  options?: Record<string, any>;
}> &
  TWithNameRequired &
  TWithReadonlyTags;
