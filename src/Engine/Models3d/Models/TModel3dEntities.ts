import type { AnimationMixer } from 'three';

import type { TAnimationActions } from '@/Engine/Animations';

import type { TModel3dParams } from './TModel3dParams';

export type TModel3dEntities = TModel3dParams &
  Readonly<{
    actions: TAnimationActions;
    mixer: AnimationMixer;
  }>;
