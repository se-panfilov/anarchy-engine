import type { AnimationAction } from 'three';

import type { TAnimationStateConfig } from '@/Animations/Models';
import { filterOutEmptyFields } from '@/Utils';

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
