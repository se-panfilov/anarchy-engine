import type { TActorParams, TActorStates, TWithActorStates } from '@/Engine/Actor/Models';
import type { TFsmWrapper } from '@/Engine/Fsm';
import type { TWriteable } from '@/Engine/Utils';

export function withActorStates(params: TActorParams): TWithActorStates {
  const states: TWriteable<TActorStates> = params.states ?? {};

  function setAnimationsFsm(fsm: TFsmWrapper): void {
    // eslint-disable-next-line functional/immutable-data
    states.animationsFsm = fsm;
  }

  if (params.states?.animationsFsm) {
    setAnimationsFsm(params.states.animationsFsm);
  }

  return {
    states,
    setAnimationsFsm,
    getAnimationsFsm: (): TFsmWrapper | undefined => states.animationsFsm
  };
}
