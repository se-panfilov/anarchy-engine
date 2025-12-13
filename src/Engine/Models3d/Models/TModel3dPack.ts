import type { AnimationMixer, Group, Mesh } from 'three';

import type { TAnimationActions, TAnimationsPack } from '@/Engine/Animations/Models';
import type { TWithName } from '@/Engine/Mixins';

import type { TModel3dParams } from './TModel3dParams';

export type TModel3dPack = TModel3dParams &
  Readonly<{
    model: Group | Mesh;
    animations: TAnimationsPack;
    actions: TAnimationActions;
    mixer: AnimationMixer;
    clonedFrom?: string | undefined;
  }> &
  TWithName;
