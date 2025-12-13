import type { AnimationClip, Group } from 'three';

import type { TModel3dLoadOptions } from './TModel3dLoadOptions';

export type TModel3dLoadResult = Readonly<{
  url: string;
  model: Group;
  animations: ReadonlyArray<AnimationClip>;
  options: TModel3dLoadOptions;
}>;
