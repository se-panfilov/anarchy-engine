import type { AnimationClip, Group } from 'three';

export type TModel3dLoadResult = Readonly<{
  url: string;
  model: Group;
  animations: ReadonlyArray<AnimationClip>;
}>;
