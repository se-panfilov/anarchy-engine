import type { AnimationClip, AnimationMixer } from 'three';

import type { TAnimationActions } from '@/Engine/Animations/Models';
import type { TModel3dEntities, TRawModel3d, TWithModel3dEntities } from '@/Engine/Models3d/Models';

export function withModel3dEntities({ model3dSource, animationsSource, mixer, actions }: TModel3dEntities): TWithModel3dEntities {
  return {
    getRawModel3d: (): TRawModel3d => model3dSource,
    getAnimations: (): ReadonlyArray<AnimationClip> => animationsSource ?? [],
    getMixer: (): AnimationMixer => mixer,
    getActions: (): TAnimationActions => actions
  };
}
