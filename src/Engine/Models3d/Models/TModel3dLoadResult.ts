import type { AnimationClip, Group, Mesh } from 'three';

import type { TModel3dLoadOptions } from './TModel3dLoadOptions';

export type TModel3dLoadResult = Readonly<{
  url: string;
  model: Group | Mesh;
  animations: Record<string, AnimationClip>;
  options: TModel3dLoadOptions;
}>;
