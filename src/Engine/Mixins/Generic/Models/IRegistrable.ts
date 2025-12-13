import type { CommonTag } from '@/Engine/Abstract';
import type { IWithTags } from '@/Engine/Mixins';

export type IRegistrable = {
  id: string;
} & IWithTags<CommonTag>;
