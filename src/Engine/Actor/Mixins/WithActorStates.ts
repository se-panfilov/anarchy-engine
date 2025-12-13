import type { TActorParams, TActorStates, TWithActorStates } from '@/Engine/Actor/Models';
import type { TAnimationsFsmActor } from '@/Engine/Animations';
import type { TWriteable } from '@/Engine/Utils';

export function withActorStates(params: TActorParams): TWithActorStates {
  const states: TWriteable<TActorStates> = {};

  function setAnimationsFsm(animationsFsmActor: TAnimationsFsmActor): void {
    // eslint-disable-next-line functional/immutable-data
    states.animationsFsmActor = animationsFsmActor.getSnapshot().status !== 'active' ? animationsFsmActor.start() : animationsFsmActor;
  }

  if (params.states?.animationsFsmActor) {
    setAnimationsFsm(params.states.animationsFsmActor);
  }

  return {
    states,
    setAnimationsFsm
  };
}
