import type { AnimationClip, AnimationMixer, Group, Mesh, Object3D } from 'three';

import type { TAnimationActions } from '@/Engine/Animations/Models';
import type { TModel3dEntities, TWithModel3dEntities } from '@/Engine/Models3d/Models';

export function withModel3dEntities({ model3dSource, animationsSource, mixer, actions }: TModel3dEntities): TWithModel3dEntities {
  return {
    getRawModel3d: (): Group | Mesh | Object3D => model3dSource,
    getAnimations: (): ReadonlyArray<AnimationClip> => animationsSource ?? [],
    getMixer: (): AnimationMixer => mixer,
    getActions: (): TAnimationActions => actions
  };
}
