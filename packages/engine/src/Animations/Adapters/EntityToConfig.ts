import type { TAnimationStateConfig } from '@Engine/Animations/Models';
import { filterOutEmptyFields } from '@Engine/Utils';
import type { AnimationAction } from 'three';

export function animationActionToConfig(entity: AnimationAction): TAnimationStateConfig {
  return filterOutEmptyFields({
    name: entity.getClip().name,
    time: entity.time,
    weight: entity.weight,
    loop: entity.loop,
    repetitions: entity.repetitions,
    clampWhenFinished: entity.clampWhenFinished,
    timeScale: entity.timeScale,
    enabled: entity.enabled,
    paused: entity.paused
  });
}
