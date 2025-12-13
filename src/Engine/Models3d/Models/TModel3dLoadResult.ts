import type { Group, Mesh } from 'three';

import type { TAnimationsPack } from '@/Engine/Animations/Models';

import type { TModel3dLoadOptions } from './TModel3dLoadOptions';

export type TModel3dLoadResult = Readonly<{
  url: string;
  model: Group | Mesh;
  animations: TAnimationsPack;
  options: TModel3dLoadOptions;
}>;
