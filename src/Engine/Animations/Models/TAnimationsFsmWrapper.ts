import type { Actor as ActorFsm, ActorLogic } from 'xstate';

import type { TWrapper } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

// TODO 9.3.0 STATE: fix any
export type TAnimationsFsmWrapper = TWrapper<ActorLogic<any, any>> &
  Readonly<{
    createActorFsm: () => ActorFsm<ActorLogic<any, any>>;
    registerInstance: (id: string) => void;
    unRegisterInstance: (id: string) => void;
    getInstances: () => ReadonlyArray<string>;
  }> &
  TDestroyable;
