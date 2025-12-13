import type { Actor as ActorFsm, ActorLogic as ActorFsmLogic } from 'xstate';

import type { TActorParams, TActorStates, TWithActorStates } from '@/Engine/Actor/Models';
import type { TAnimationsFsmWrapper } from '@/Engine/Animations';
import type { TWriteable } from '@/Engine/Utils';

export function withActorStates(params: TActorParams): TWithActorStates {
  const states: TWriteable<TActorStates> = {};

  function setAnimationsFsm(animationsFsm: TAnimationsFsmWrapper): void {
    // TODO 9.3.0 STATE: fix any
    const actorFsm: ActorFsm<ActorFsmLogic<any, any>> = animationsFsm.createActorFsm();

    const result = actorFsm.start();

    // eslint-disable-next-line functional/immutable-data
    states.animationsFsm = result;
  }

  if (params.states) {
    setAnimationsFsm(params.states?.animationsFsm);
  }

  return {
    states,
    setAnimationsFsm
  };
}
