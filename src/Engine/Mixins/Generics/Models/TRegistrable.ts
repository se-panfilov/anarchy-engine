import type { TWithNameOptional, TWithTagsMixin } from '@/Engine/Mixins';

export type TRegistrable = Readonly<{
  id: string;
}> &
  TWithNameOptional &
  TWithTagsMixin;
