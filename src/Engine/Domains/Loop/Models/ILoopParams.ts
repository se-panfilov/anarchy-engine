import type { LoopTag } from '@Engine/Domains/Loop/Models';

export type ILoopParams = Readonly<{
  tags: ReadonlyArray<LoopTag | string>;
}>;
