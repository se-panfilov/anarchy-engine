import type { Group, Mesh, Object3D } from 'three';

import type { TWithName } from '@/Engine/Mixins';

import type { TModel3dPrimitiveParams } from './TModel3dPrimitiveParams';

export type TModel3dPrimitivePack = TModel3dPrimitiveParams &
  Readonly<{
    model: Group | Mesh | Object3D;
    clonedFrom?: string | undefined;
  }> &
  TWithName;
