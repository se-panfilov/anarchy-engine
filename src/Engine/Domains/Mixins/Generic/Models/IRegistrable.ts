import type { CommonTag } from '@/Engine/Domains/Abstract';

export type IRegistrable = {
  id: string;
  tags: ReadonlyArray<CommonTag | string>;
  isRegistrable: boolean;
};
