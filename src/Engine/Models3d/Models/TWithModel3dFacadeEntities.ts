import type { AnimationMixer, Group, Mesh } from 'three';

import type { TAnimationActions, TAnimationsPack } from '@/Engine/Animations/Models';

import type { TModel3dLoadOptions } from './TModel3dLoadOptions';

export type TWithModel3dFacadeEntities = Readonly<{
  getUrl: () => string;
  getModel: () => Group | Mesh;
  getAnimations: () => TAnimationsPack;
  getMixer: () => AnimationMixer;
  getActions: () => TAnimationActions;
  getOptions: () => TModel3dLoadOptions;
  getClonedFrom: () => string | undefined;
}>;
