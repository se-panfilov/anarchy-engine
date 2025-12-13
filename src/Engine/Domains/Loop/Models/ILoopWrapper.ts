import type { ILoopUtils, LoopFn, LoopTag } from '@Engine/Domains/Loop';
import type { IWrapper } from '@Engine/Models';

export type ILoopWrapper = IWrapper<LoopFn> &
  ILoopUtils &
  Readonly<{
    tags: ReadonlyArray<LoopTag | string>;
  }>;
