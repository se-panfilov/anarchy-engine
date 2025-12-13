import type { AnimationClip, Group, Mesh, Object3D } from 'three';

import type { TMaterialWrapper } from '@/Engine/Material';

import type { TModel3dProps } from './TModel3dProps';

export type TModel3dParams = TModel3dProps &
  Readonly<{
    model3dSource: Group | Mesh | Object3D;
    animationsSource: ReadonlyArray<AnimationClip>;
    materialSource?: TMaterialWrapper;
    clonedFrom?: string;
  }>;
