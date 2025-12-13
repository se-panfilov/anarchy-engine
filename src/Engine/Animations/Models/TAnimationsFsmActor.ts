import type { Actor as ActorFsm, ActorLogic as ActorFsmLogic } from 'xstate';

// TODO 9.3.0 STATE: fix any (for xstate)
export type TAnimationsFsmActor = ActorFsm<ActorFsmLogic<any, any>>;
//export type TAnimationsFsmActor<T extends Snapshot<R>, R> = ActorFsm<ActorFsmLogic<T, EventObject, NonReducibleUnknown, AnyActorSystem, EventObject>>;
