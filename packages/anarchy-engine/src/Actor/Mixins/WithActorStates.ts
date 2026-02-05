import type { TActorParams, TActorStates, TWithActorStates } from '@hellpig/anarchy-engine/Actor/Models';
import type { TFsmWrapper } from '@hellpig/anarchy-engine/Fsm';
import type { TWriteable } from '@hellpig/anarchy-shared/Utils';
import { isDefined } from '@hellpig/anarchy-shared/Utils';

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
    findAnimationsFsm: (): TFsmWrapper | undefined => states.animationsFsm,
    getAnimationsFsm: (): TFsmWrapper | never => {
      if (isDefined(states.animationsFsm)) return states.animationsFsm;
      throw new Error('[ACTOR]: AnimationsFSM are not exists');
    }
  };
}
