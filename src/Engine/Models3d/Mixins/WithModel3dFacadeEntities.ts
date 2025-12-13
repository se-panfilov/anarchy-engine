import type { AnimationClip, AnimationMixer, Group, Mesh, Object3D } from 'three';

import type { TAnimationActions } from '@/Engine/Animations/Models';
import type { TModel3dEntities, TWithModel3dFacadeEntities } from '@/Engine/Models3d/Models';

export function withModel3dFacadeEntities({ model, animations, clonedFrom, mixer, actions }: TModel3dEntities): TWithModel3dFacadeEntities {
  return {
    getModel: (): Group | Mesh | Object3D => model,
    getAnimations: (): ReadonlyArray<AnimationClip> => animations,
    getMixer: (): AnimationMixer => mixer,
    getActions: (): TAnimationActions => actions,
    getClonedFrom: (): string | undefined => clonedFrom
  };
}
