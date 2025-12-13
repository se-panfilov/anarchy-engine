import type { AnimationMixer } from 'three';

import type { TAnimationActions } from '@/Engine/Animations';

import type { TModel3dPack } from './TModel3dPack';

export type TModels3dFacadeParams = Omit<TModel3dPack, 'actions' | 'mixer'> &
  Readonly<{
    actions?: TAnimationActions;
    mixer?: AnimationMixer;
  }>;
