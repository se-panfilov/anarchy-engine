import type { IWrapper } from '@Engine/Models';
import type { LoopTag, LoopFn, ILoopUtils } from '@Engine/Domains/Loop/Models';

export type ILoopWrapper = IWrapper<LoopFn> &
  ILoopUtils &
  Readonly<{
    tags: ReadonlyArray<LoopTag | string>;
  }>;
