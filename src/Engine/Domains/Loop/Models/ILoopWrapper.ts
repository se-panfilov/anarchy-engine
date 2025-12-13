import type { IWrapper } from '@Engine/Domains/Abstract';

import type { LoopTag } from '@/Engine/Domains/Loop/Constants';

import type { ILoopUtils } from './ILoopUtils';
import type { LoopFn } from './LoopFn';

export type ILoopWrapper = IWrapper<LoopFn> &
  ILoopUtils &
  Readonly<{
    delta: number;
    tags: ReadonlyArray<LoopTag | string>;
  }>;
