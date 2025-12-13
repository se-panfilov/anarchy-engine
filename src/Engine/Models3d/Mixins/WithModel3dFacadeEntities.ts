import type { AnimationClip, AnimationMixer, Group, Mesh, Object3D } from 'three';

import type { TAnimationActions } from '@/Engine/Animations/Models';
import type { TModel3dEntities, TModel3dLoadOptions, TWithModel3dFacadeEntities } from '@/Engine/Models3d/Models';

export function withModel3dFacadeEntities({ url, model, animations, options, clonedFrom, mixer, actions }: TModel3dEntities): TWithModel3dFacadeEntities {
  return {
    getUrl: (): string => url,
    getModel: (): Group | Mesh | Object3D => model,
    getAnimations: (): ReadonlyArray<AnimationClip> => animations,
    getMixer: (): AnimationMixer => mixer,
    getActions: (): TAnimationActions => actions,
    getOptions: (): TModel3dLoadOptions => options,
    getClonedFrom: (): string | undefined => clonedFrom
  };
}
