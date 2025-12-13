import type { AnimationClip, Group } from 'three';

export type TModel3dLoadResult = Readonly<{
  url: string;
  model: Group;
  animations: ReadonlyArray<AnimationClip>;
  options: TModel3dLoadOptions;
}>;

export type TModel3dLoadOptions = Readonly<{
  shouldAddToScene: boolean;
  shouldSaveToRegistry: boolean;
}>;
