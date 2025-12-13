import type { Actor as ActorFsm, ActorLogic as ActorFsmLogic } from 'xstate';

import type { TActorParams, TActorStates, TWithActorStates } from '@/Engine/Actor/Models';
import type { TAnimationsFsmWrapper } from '@/Engine/Animations';
import type { TWriteable } from '@/Engine/Utils';

export function withActorStates(params: TActorParams): TWithActorStates {
  const states: TWriteable<TActorStates> = {};

  function setAnimationsFsm(animationsFsm: TAnimationsFsmWrapper): void {
    // TODO 9.3.0 STATE: fix any
    const actorFsm: ActorFsm<ActorFsmLogic<any, any>> = animationsFsm.createActorFsm();

    // eslint-disable-next-line functional/immutable-data
    states.animationsFsm = actorFsm;

    // TODO debug
    actorFsm.subscribe((state: any): void => {
      console.log('Actor state:', state.value);
    });
  }

  if (params.states) {
    setAnimationsFsm(params.states?.animationsFsm);
  }

  return {
    states,
    setAnimationsFsm
  };
}
