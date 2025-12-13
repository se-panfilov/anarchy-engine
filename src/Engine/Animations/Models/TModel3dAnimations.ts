import type { AnimationClip } from 'three';

export type TModel3dAnimations = Readonly<{
  url: string;
  pack: ReadonlyArray<AnimationClip>;
}>;
