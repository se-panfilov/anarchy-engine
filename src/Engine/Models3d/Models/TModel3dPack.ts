import type { Group, Mesh } from 'three';

import type { TAnimationsPack } from '@/Engine/Animations/Models';
import type { TWithName } from '@/Engine/Mixins';

import type { TModel3dParams } from './TModel3dParams';

export type TModel3dPack = TModel3dParams &
  Readonly<{
    model: Group | Mesh;
    animations: TAnimationsPack;
    clonedFrom?: string | undefined;
  }> &
  TWithName;
