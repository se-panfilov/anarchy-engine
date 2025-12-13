import type { AnimationMixer } from 'three';

import type { TAnimationActions } from '@/Engine/Animations';

import type { TModel3dComplexPack } from './TModel3dComplexPack';

export type TModel3dComplexEntities = TModel3dComplexPack &
  Readonly<{
    actions: TAnimationActions;
    mixer: AnimationMixer;
  }>;
