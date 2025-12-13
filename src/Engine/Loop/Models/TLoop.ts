import type { BehaviorSubject } from 'rxjs';

import type { TAbstractReadonlyLoopWith } from '@/Engine/Abstract';
import type { LoopTrigger, LoopType } from '@/Engine/Loop/Constants';
import type { TDestroyable, TWithName } from '@/Engine/Mixins';

import type { TDelta } from './TDelta';
import type { TLoopTriggerFn } from './TLoopTriggerFn';

export type TLoop = TAbstractReadonlyLoopWith<TDelta> &
  Readonly<{
    type: LoopType;
    triggerMode: LoopTrigger;
    trigger: TLoopTriggerFn | number;
    start: () => void;
    stop: () => void;
    enabled$: BehaviorSubject<boolean>;
  }> &
  TWithName &
  TDestroyable;
