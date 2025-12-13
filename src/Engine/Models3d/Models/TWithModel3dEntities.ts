import type { AnimationClip, AnimationMixer } from 'three';

import type { TAnimationActions } from '@/Engine/Animations/Models';

import type { TRawModel3d } from './TRawModel3d';

export type TWithModel3dEntities = Readonly<{
  getRawModel3d: () => TRawModel3d;
  getAnimations: () => ReadonlyArray<AnimationClip>;
  getMixer: () => AnimationMixer;
  getActions: () => TAnimationActions;
}>;
