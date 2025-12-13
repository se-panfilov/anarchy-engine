import type { BehaviorSubject } from 'rxjs';

import type { TAbstractLoop } from '@/Engine/Abstract';
import type { LoopTrigger, LoopType } from '@/Engine/Loop/Constants';
import type { TDestroyable, TRegistrable, TWithName } from '@/Engine/Mixins';

import type { TDelta } from './TDelta';
import type { TLoopTriggerFn } from './TLoopTriggerFn';

export type TLoop = TAbstractLoop<TDelta> &
  Readonly<{
    type: LoopType;
    triggerMode: LoopTrigger;
    trigger: TLoopTriggerFn | number;
    isParallelMode: boolean;
    start: () => void;
    stop: () => void;
    enabled$: BehaviorSubject<boolean>;
    priority$: BehaviorSubject<number>;
  }> &
  Omit<TRegistrable, 'name'> &
  TWithName &
  TDestroyable;
