import type { TAnimationStateParams } from '@Engine/Animations';
import type { TAnyMaterialWrapper } from '@Engine/Material';
import type { TWithName, TWithTags } from '@Engine/Mixins';
import type { PrimitiveModel3dType } from '@Engine/Models3d/Constants';
import type { TObject3DParams } from '@Engine/ThreeLib';
import type { AnimationClip } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TModel3dOptions } from './TModel3dOptions';

export type TModel3dParams = Readonly<{
  model3dSource: GLTF | PrimitiveModel3dType;
  animationsSource?: ReadonlyArray<AnimationClip>;
  animationsState?: ReadonlyArray<TAnimationStateParams>;
  material?: TAnyMaterialWrapper;
  forceClone?: boolean;
  options?: TModel3dOptions;
}> &
  // We're not ready to add animations like this, so omit them for now
  Omit<TObject3DParams, 'animations'> &
  TWithName &
  TWithTags;
