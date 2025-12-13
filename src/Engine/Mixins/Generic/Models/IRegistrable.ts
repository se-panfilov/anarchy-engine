import type { IWithName, IWithTagsMixin } from '@/Engine/Mixins';

export type IRegistrable = {
  id: string;
} & IWithName &
  IWithTagsMixin;
