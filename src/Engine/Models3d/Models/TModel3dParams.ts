import type { AnimationClip } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TMaterialWrapper } from '@/Engine/Material';
import type { PrimitiveModel3dType } from '@/Engine/Models3d/Constants';

import type { TModel3dProps } from './TModel3dProps';

export type TModel3dParams = TModel3dProps &
  Readonly<{
    model3dSource: GLTF | PrimitiveModel3dType;
    animationsSource?: ReadonlyArray<AnimationClip>;
    materialSource?: TMaterialWrapper;
  }>;
