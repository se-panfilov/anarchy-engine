import type { AnimationClip, AnimationMixer, Group, Mesh, Object3D } from 'three';

import type { TAnimationActions } from '@/Engine/Animations/Models';

export type TWithModel3dFacadeEntities = Readonly<{
  getModel: () => Group | Mesh | Object3D;
  getAnimations: () => ReadonlyArray<AnimationClip>;
  getMixer: () => AnimationMixer;
  getActions: () => TAnimationActions;
  getClonedFrom: () => string | undefined;
}>;
