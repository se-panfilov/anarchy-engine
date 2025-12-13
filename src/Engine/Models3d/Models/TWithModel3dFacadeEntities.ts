import type { Group, Mesh } from 'three';

import type { TAnimationsPack } from '@/Engine/Animations/Models';

import type { TModel3dLoadOptions } from './TModel3dLoadOptions';

export type TWithModel3dFacadeEntities = Readonly<{
  getUrl: () => string;
  getModel: () => Group | Mesh;
  getAnimations: () => TAnimationsPack;
  getOptions: () => TModel3dLoadOptions;
  getClonedFrom: () => string | undefined;
}>;
