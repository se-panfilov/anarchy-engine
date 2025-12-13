import type { AnimationMixer } from 'three';

import type { TAnimationActions } from '@/Engine/Animations';
import type { TOptional } from '@/Engine/Utils';

import type { TModel3dPack } from './TModel3dPack';

export type TModel3dEntities = Omit<TModel3dPack, 'url'> &
  TOptional<Pick<TModel3dPack, 'url'>> &
  Readonly<{
    actions: TAnimationActions;
    mixer?: AnimationMixer;
  }>;
