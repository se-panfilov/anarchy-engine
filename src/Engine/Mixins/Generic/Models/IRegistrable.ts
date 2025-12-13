import type { CommonTag } from '@/Engine/Domains/Abstract';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

export type IRegistrable = {
  id: string;
  isRegistrable: boolean;
} & IWithReadonlyTags<CommonTag>;
