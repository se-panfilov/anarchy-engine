import type { TWithNameRequired } from '@/Engine/Mixins';

export type TAbstractResourceConfig = Readonly<{
  url: string;
  isForce?: boolean;
}> &
  TWithNameRequired;
