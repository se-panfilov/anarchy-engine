import type { AnimationClip, AnimationMixer, Group, Mesh } from 'three';

import type { TAnimationsPack } from '@/Engine/Animations/Models';

import type { TModel3dLoadOptions } from './TModel3dLoadOptions';

export type TWithModel3dFacadeEntities = Readonly<{
  getUrl: () => string;
  getModel: () => Group | Mesh;
  getAnimations: () => TAnimationsPack;
  getActions: () => Record<string, AnimationClip>;
  getMixer: () => AnimationMixer;
  getOptions: () => TModel3dLoadOptions;
}>;
