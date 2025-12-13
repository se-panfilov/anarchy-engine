import type { SendFunction } from 'robot3';
import type { Subject } from 'rxjs';

import type { TWrapper } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TAnimationsFsmInstance, TAnimationsFsmState } from './TAnimationsFsmInstance';

export type TAnimationsFsmWrapper = TWrapper<TAnimationsFsmInstance> &
  Readonly<{
    changed$: Subject<TAnimationsFsmState>;
    send: SendFunction<any>;
    getCurrentState: () => TAnimationsFsmState;
  }> &
  TDestroyable;
