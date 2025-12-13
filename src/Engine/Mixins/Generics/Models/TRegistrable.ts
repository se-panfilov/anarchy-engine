import type { IWithName, IWithTagsMixin } from '@/Engine/Mixins';

export type TRegistrable = Readonly<{
  id: string;
}> &
  IWithName &
  IWithTagsMixin;
