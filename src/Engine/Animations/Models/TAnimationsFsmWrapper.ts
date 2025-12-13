import type { ActorLogic as ActorFsmLogic } from 'xstate';

import type { TWrapper } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TAnimationsFsmActor } from './TAnimationsFsmActor';

// TODO 9.3.0 STATE: fix any
export type TAnimationsFsmWrapper = TWrapper<ActorFsmLogic<any, any>> &
  Readonly<{
    createActorFsm: () => TAnimationsFsmActor;
    registerInstance: (id: string) => void;
    unRegisterInstance: (id: string) => void;
    getInstances: () => ReadonlyArray<string>;
  }> &
  TDestroyable;
