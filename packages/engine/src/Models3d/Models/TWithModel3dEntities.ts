import type { AnimationAction, AnimationClip, AnimationMixer } from 'three';

import type { TAnimationActions } from '@/Animations/Models';

import type { TModel3dEntities } from './TModel3dEntities';
import type { TRawModel3d } from './TRawModel3d';

export type TWithModel3dEntities = Readonly<{
  getRawModel3d: () => TRawModel3d;
  addAnimations: (animations: ReadonlyArray<AnimationClip>) => void;
  setAnimations: (animations: ReadonlyArray<AnimationClip>) => void;
  getAnimations: () => ReadonlyArray<AnimationClip>;
  getActiveAnimationAction: () => AnimationAction | undefined;
  getMixer: () => AnimationMixer;
  setActions: (actions: TAnimationActions) => void;
  addActions: (actions: TAnimationActions) => void;
  getActions: () => TAnimationActions;
}> &
  TModel3dEntities;
