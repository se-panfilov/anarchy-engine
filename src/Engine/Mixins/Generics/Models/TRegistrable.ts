import type { TWithName, TWithTagsMixin } from '@/Engine/Mixins';

export type TRegistrable = Readonly<{
  id: string;
}> &
  TWithName &
  TWithTagsMixin;
