import type { AnimationClip, AnimationMixer } from 'three';

import type { TModel3dPack } from './TModel3dPack';

export type TModels3dFacadeParams = Omit<TModel3dPack, 'actions' | 'mixer'> &
  Readonly<{
    actions?: Record<string, AnimationClip>;
    mixer?: AnimationMixer;
  }>;
