import type { TActorConfigToParamsDependencies, TActorStates, TActorStatesConfig } from '@/Engine/Actor/Models';
import type { TFsmWrapper } from '@/Engine/Fsm';
import { isNotDefined } from '@/Engine/Utils';

export function actorStatesConfigToParams(states: TActorStatesConfig, dependencies: TActorConfigToParamsDependencies): TActorStates {
  const { animationsFsmSource } = states;

  return {
    animationsFsm: animationsFsmSource ? getAnimationsFsm(animationsFsmSource, dependencies) : undefined
  };
}

function getAnimationsFsm(source: string, dependencies: TActorConfigToParamsDependencies): TFsmWrapper | never {
  const animationsFsm: TFsmWrapper | undefined = dependencies.fsmService.createInstanceBySourceName(source);
  if (isNotDefined(animationsFsm)) throw new Error(`Actor. ConfigToParams: AnimationsFsm "${source}" not found, during the actor initialization`);
  return animationsFsm;
}
