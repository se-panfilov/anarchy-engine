import type { AnimationMixer, Group, Mesh } from 'three';

import type { TAnimationActions, TAnimationsPack } from '@/Engine/Animations/Models';
import type { TWithName, TWithReadonlyTags } from '@/Engine/Mixins';

import type { TModel3dLoadOptions } from './TModel3dLoadOptions';

export type TModel3dPack = Readonly<{
  url: string;
  model: Group | Mesh;
  animations: TAnimationsPack;
  actions: TAnimationActions;
  mixer: AnimationMixer;
  options: TModel3dLoadOptions;
}> &
  TWithName &
  TWithReadonlyTags;
