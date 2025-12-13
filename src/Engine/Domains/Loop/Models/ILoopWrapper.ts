import type { IWrapper } from '@Engine/Domains/Abstract';

import type { LoopTag } from '../Constants';
import type { ILoopUtils } from './ILoopUtils';
import type { LoopFn } from './LoopFn';

export type ILoopWrapper = IWrapper<LoopFn> &
  ILoopUtils &
  Readonly<{
    tags: ReadonlyArray<LoopTag | string>;
  }>;
