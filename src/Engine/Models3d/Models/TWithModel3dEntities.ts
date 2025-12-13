import type { AnimationClip, AnimationMixer } from 'three';

import type { TAnimationActions } from '@/Engine/Animations/Models';

import type { TRawModel } from './TRawModel';

export type TWithModel3dEntities = Readonly<{
  getRawModel3d: () => TRawModel;
  getAnimations: () => ReadonlyArray<AnimationClip>;
  getMixer: () => AnimationMixer;
  getActions: () => TAnimationActions;
}>;
