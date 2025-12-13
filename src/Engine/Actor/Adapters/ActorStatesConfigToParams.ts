import type { TActorConfigToParamsDependencies, TActorStates, TActorStatesConfig } from '@/Engine/Actor/Models';
import type { TAnimationsFsmWrapper } from '@/Engine/Animations';
import { isNotDefined } from '@/Engine/Utils';

export function actorStatesConfigToParams(states: TActorStatesConfig, dependencies: TActorConfigToParamsDependencies): TActorStates {
  const { animationsFsmSource } = states;

  return {
    animationsFsm: animationsFsmSource ? getAnimationsFsm(animationsFsmSource, dependencies) : undefined
  };
}

function getAnimationsFsm(source: string, dependencies: TActorConfigToParamsDependencies): TAnimationsFsmWrapper | never {
  const animationsFsm: TAnimationsFsmWrapper | undefined = dependencies.animationsFsmService.getRegistry().findByName(source);
  if (isNotDefined(animationsFsm)) throw new Error(`Actor. ConfigToParams: AnimationsFsm "${source}" not found, during the actor initialization`);
  return animationsFsm;
}
