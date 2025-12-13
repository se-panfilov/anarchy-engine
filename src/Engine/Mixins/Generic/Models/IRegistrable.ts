import type { IWithName, IWithTagsMixin } from '@/Engine/Mixins';

export type IRegistrable = Readonly<{
  id: string;
}> &
  IWithName &
  IWithTagsMixin;
