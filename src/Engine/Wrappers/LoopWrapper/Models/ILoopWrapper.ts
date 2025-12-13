import type { LoopTag } from '@Engine/Constants';
import type { IWrapper } from '@Engine/Models';
import type { ILoopUtils } from '@Engine/Wrappers';
import type { LoopFn } from '@Engine/Wrappers/LoopWrapper/Models/LoopFn';

export type ILoopWrapper = IWrapper<LoopFn> &
  ILoopUtils &
  Readonly<{
    tags: ReadonlyArray<LoopTag | string>;
  }>;
