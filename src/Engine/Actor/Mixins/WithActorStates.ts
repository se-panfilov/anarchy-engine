import type { TActorParams, TActorStates, TWithActorStates } from '@/Engine/Actor/Models';
import type { TAnimationsFsmWrapper } from '@/Engine/Animations';
import type { TWriteable } from '@/Engine/Utils';

export function withActorStates(params: TActorParams): TWithActorStates {
  const states: TWriteable<TActorStates> = {};

  function setAnimationsFsm(animationsFsmW: TAnimationsFsmWrapper): void {
    // eslint-disable-next-line functional/immutable-data
    states.animationsFsm = animationsFsmW;
  }

  if (params.states?.animationsFsm) {
    setAnimationsFsm(params.states.animationsFsm);
  }

  return {
    states,
    setAnimationsFsm
  };
}
