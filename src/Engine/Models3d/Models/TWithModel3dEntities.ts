import type { AnimationClip, AnimationMixer } from 'three';

import type { TAnimationActions } from '@/Engine/Animations/Models';

import type { TModel3dEntities } from './TModel3dEntities';
import type { TRawModel3d } from './TRawModel3d';

export type TWithModel3dEntities = Readonly<{
  getRawModel3d: () => TRawModel3d;
  addAnimations: (animations: ReadonlyArray<AnimationClip>) => void;
  setAnimations: (animations: ReadonlyArray<AnimationClip>) => void;
  getAnimations: () => ReadonlyArray<AnimationClip>;
  getMixer: () => AnimationMixer;
  getActions: () => TAnimationActions;
}> &
  TModel3dEntities;
