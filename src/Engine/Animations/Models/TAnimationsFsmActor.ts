import type { Actor as ActorFsm, ActorLogic as ActorFsmLogic, ActorSystem, EventObject, NonReducibleUnknown } from 'xstate';

// TODO 9.3.0 STATE: fix any (for xstate)
export type TAnimationsFsmActor = ActorFsm<ActorFsmLogic<any, any, NonReducibleUnknown, ActorSystem<any>, EventObject>>;
