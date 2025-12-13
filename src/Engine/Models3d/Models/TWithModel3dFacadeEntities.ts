import type { AnimationClip, AnimationMixer, Group, Mesh, Object3D } from 'three';

import type { TAnimationActions } from '@/Engine/Animations/Models';

import type { TModel3dLoadOptions } from './TModel3dLoadOptions';

export type TWithModel3dFacadeEntities = Readonly<{
  getUrl: () => string;
  getModel: () => Group | Mesh | Object3D;
  getAnimations: () => ReadonlyArray<AnimationClip>;
  getMixer: () => AnimationMixer;
  getActions: () => TAnimationActions;
  getOptions: () => TModel3dLoadOptions;
  getClonedFrom: () => string | undefined;
}>;
