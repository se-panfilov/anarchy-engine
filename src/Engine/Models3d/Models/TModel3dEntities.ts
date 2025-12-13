import type { AnimationMixer } from 'three';

import type { TAnimationActions } from '@/Engine/Animations';

import type { TModel3dPack } from './TModel3dPack';

export type TModel3dEntities = TModel3dPack &
  Readonly<{
    actions: TAnimationActions;
    mixer: AnimationMixer;
  }>;
