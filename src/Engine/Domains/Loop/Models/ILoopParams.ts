import type { LoopTag } from '@Engine/Domains/Loop';

export type ILoopParams = Readonly<{
  tags: ReadonlyArray<LoopTag | string>;
}>;
