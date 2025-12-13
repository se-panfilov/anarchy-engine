import type { CommonTags } from '@/Engine/Domains/Abstract';
import type { LoopTag } from '@/Engine/Domains/Loop/Constants';

export type ILoopParams = Readonly<{
  tags: ReadonlyArray<LoopTag | CommonTags | string>;
}>;
