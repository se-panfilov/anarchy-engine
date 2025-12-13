import type { Observable } from 'rxjs';

import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { LoopTag } from '@/Engine/Domains/Loop/Constants';
import type { IWithReadonlyTags, IWithTags } from '@/Engine/Mixins';

import type { ILoopUtils } from './ILoopUtils';
import type { LoopFn } from './LoopFn';

// TODO (S.Panfilov) extract
export type ILoopTimes = Readonly<{ delta: number, frameTime: number, elapsedTime: number }>

export type ILoopWrapper = IWrapper<LoopFn> &
  ILoopUtils &
  IWithTags<LoopTag> &
  IWithReadonlyTags<LoopTag> &
  Readonly<{
    delta: number;
    tick$: Observable<ILoopTimes>;
  }>;
