import type { AnimationClip, Group, Mesh, Object3D } from 'three';

import type { TWithName } from '@/Engine/Mixins';

import type { TModel3dComplexParams } from './TModel3dComplexParams';

export type TModel3dComplexPack = TModel3dComplexParams &
  Readonly<{
    model: Group | Mesh | Object3D;
    animations: ReadonlyArray<AnimationClip>;
    clonedFrom?: string | undefined;
  }> &
  TWithName;
