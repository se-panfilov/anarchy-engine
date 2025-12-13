import type { Actor as ActorFsm, ActorLogic as ActorFsmLogic, ActorSystem, EventObject, NonReducibleUnknown } from 'xstate';

export type TActorStates = Readonly<{
  // TODO 9.3.0 STATE: fix any
  animationsFsm?: ActorFsm<ActorFsmLogic<any, any, NonReducibleUnknown, ActorSystem<any>, EventObject>>;
}>;
