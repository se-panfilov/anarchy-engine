import type { TActorConfigToParamsDependencies, TActorStates, TActorStatesConfig, TAnimationsFsmSource } from '@/Engine/Actor/Models';
import type { TFsmWrapper } from '@/Engine/Fsm';
import { isNotDefined } from '@/Engine/Utils';

export function actorStatesConfigToParams(states: TActorStatesConfig, dependencies: TActorConfigToParamsDependencies): TActorStates {
  const { animationsFsm } = states;

  return {
    animationsFsm: animationsFsm ? getAnimationsFsm(animationsFsm, dependencies) : undefined
  };
}

function getAnimationsFsm(source: TAnimationsFsmSource, dependencies: TActorConfigToParamsDependencies): TFsmWrapper | never {
  const animationsFsm: TFsmWrapper | undefined = dependencies.fsmService.createInstanceBySourceName(source.name, source.currentState, source.strategy);
  if (isNotDefined(animationsFsm)) throw new Error(`Actor. ConfigToParams: AnimationsFsm "${source}" not found, during the actor initialization`);
  return animationsFsm;
}
