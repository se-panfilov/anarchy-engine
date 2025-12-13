import type { AnimationClip, Group, Mesh } from 'three';

import type { TAnimationsPack } from '@/Engine/Animations/Models';

import type { TModel3dLoadOptions } from './TModel3dLoadOptions';

export type TModel3dPack = Readonly<{
  url: string;
  model: Group | Mesh;
  animations: TAnimationsPack;
  // actions: Record<string, AnimationClip>;
  options: TModel3dLoadOptions;
}>;
