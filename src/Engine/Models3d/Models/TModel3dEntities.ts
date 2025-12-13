import type { AnimationMixer, Group, Mesh, Object3D } from 'three';

import type { TAnimationActions } from '@/Engine/Animations';

import type { TModel3dParams } from './TModel3dParams';

export type TModel3dEntities = Omit<TModel3dParams, 'model3dSource'> &
  Readonly<{
    model3dSource: Group | Mesh | Object3D;
    actions: TAnimationActions;
    mixer: AnimationMixer;
  }>;
