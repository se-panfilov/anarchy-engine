import type { TAbstractLoop } from '@Anarchy/Engine/Abstract';
import type { LoopTrigger, LoopType, LoopUpdatePriority } from '@Anarchy/Engine/Loop/Constants';
import type { TDestroyable, TRegistrable, TWithName } from '@Anarchy/Engine/Mixins';
import type { BehaviorSubject } from 'rxjs';

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
    shouldUpdateWithPriority: (priority: LoopUpdatePriority) => boolean;
  }> &
  Omit<TRegistrable, 'name'> &
  TWithName &
  TDestroyable;
