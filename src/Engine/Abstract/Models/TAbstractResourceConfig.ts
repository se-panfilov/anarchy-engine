import type { TWithNameRequired } from '@/Engine/Mixins';

export type TAbstractResourceConfig = Readonly<{
  url: string;
  isForce?: boolean;
  options?: Record<string, any>;
}> &
  TWithNameRequired;
