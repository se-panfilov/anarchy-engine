import type { AnimationClip, Group, Mesh, Object3D } from 'three';

import type { TWithName } from '@/Engine/Mixins';

import type { TModel3dParams } from './TModel3dParams';

export type TModel3dPack = TModel3dParams &
  Readonly<{
    model: Group | Mesh | Object3D;
    animations: ReadonlyArray<AnimationClip>;
    clonedFrom?: string | undefined;
  }> &
  TWithName;
