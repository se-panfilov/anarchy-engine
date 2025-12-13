import type { IWithName, TWithTagsMixin } from '@/Engine/Mixins';

export type TRegistrable = Readonly<{
  id: string;
}> &
  IWithName &
  TWithTagsMixin;
