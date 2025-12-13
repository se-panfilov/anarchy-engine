import type { AnimationMixer } from 'three';

import type { TAnimationActions } from '@/Engine/Animations';

import type { TModel3dParams } from './TModel3dParams';
import type { TRawModel } from './TRawModel';

export type TModel3dEntities = Omit<TModel3dParams, 'model3dSource'> &
  Readonly<{
    model3dSource: TRawModel;
    actions: TAnimationActions;
    mixer: AnimationMixer;
  }>;
