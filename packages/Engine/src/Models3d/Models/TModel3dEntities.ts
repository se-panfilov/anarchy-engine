import type { AnimationMixer } from 'three';

import type { TAnimationActions } from '@/Engine/Animations';

import type { TModel3dParams } from './TModel3dParams';
import type { TRawModel3d } from './TRawModel3d';

export type TModel3dEntities = Omit<TModel3dParams, 'model3dSource'> &
  Readonly<{
    model3dSource: TRawModel3d;
    actions: TAnimationActions;
    mixer: AnimationMixer;
  }>;
