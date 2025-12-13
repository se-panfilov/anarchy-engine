import type { BehaviorSubject } from 'rxjs';

import type { TAbstractReadonlyLoopWith } from '@/Engine/Abstract';
import type { LoopTrigger, LoopType } from '@/Engine/Loop/Constants';
import type { TDestroyable, TRegistrable, TWithName } from '@/Engine/Mixins';

import type { TDelta } from './TDelta';
import type { TLoopTriggerFn } from './TLoopTriggerFn';

// TODO 10.0.0. LOOPS: get rid of extra abstract loops (or refactor and fix inheritance)
export type TLoop = TAbstractReadonlyLoopWith<TDelta> &
  Readonly<{
    type: LoopType;
    triggerMode: LoopTrigger;
    trigger: TLoopTriggerFn | number;
    start: () => void;
    stop: () => void;
    enabled$: BehaviorSubject<boolean>;
  }> &
  Omit<TRegistrable, 'name'> &
  TWithName &
  TDestroyable;
