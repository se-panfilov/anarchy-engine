import type { IWithTags } from '@/Engine/Mixins';

export type IRegistrable = {
  id: string;
} & IWithTags<string>;
