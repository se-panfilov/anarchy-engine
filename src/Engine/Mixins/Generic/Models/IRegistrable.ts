import type { IWithTagsMixin } from '@/Engine/Mixins';

export type IRegistrable = {
  id: string;
} & IWithTagsMixin<string>;
