import type { IWrapper } from '@Engine/Domains/Abstract';
import type { ILoopUtils, LoopFn, LoopTag } from '@Engine/Domains/Loop';

export type ILoopWrapper = IWrapper<LoopFn> &
  ILoopUtils &
  Readonly<{
    tags: ReadonlyArray<LoopTag | string>;
  }>;
