import type { TAnimationsService } from '@Anarchy/Engine/Animations/Models';
import type { PrimitiveModel3dType } from '@Anarchy/Engine/Models3d/Constants';
import type { TModel3dEntities, TModel3dParams, TModel3dRawToModel3dConnectionRegistry } from '@Anarchy/Engine/Models3d/Models';
import { isDefined } from '@Anarchy/Shared/Utils';
import type { AnimationClip, Object3D } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';

import { createPrimitiveModel3d, isPrimitiveModel3dSource } from './UtilsPrimitiveModels3d';

export function createModels3dEntities(params: TModel3dParams, animationsService: TAnimationsService): TModel3dEntities {
  let model3dSource: Object3D;
  let animationsSource: ReadonlyArray<AnimationClip> = params.animationsSource ?? [];

  if (isPrimitiveModel3dSource(params.model3dSource)) {
    model3dSource = createPrimitiveModel3d(params);
  } else {
    animationsSource = [...params.model3dSource.animations, ...animationsSource];
    model3dSource = params.forceClone ? SkeletonUtils.clone(params.model3dSource.scene) : params.model3dSource.scene;
  }
  const { actions, mixer } = animationsService.createActions(model3dSource, animationsSource);

  return { ...params, model3dSource, animationsSource, actions, mixer };
}

export function isModel3dAlreadyInUse(model3dSource: GLTF | PrimitiveModel3dType, model3dRawToModel3dConnectionRegistry: TModel3dRawToModel3dConnectionRegistry): boolean {
  if (isPrimitiveModel3dSource(model3dSource)) return false;
  return isDefined(model3dRawToModel3dConnectionRegistry.findByModel3d(model3dSource.scene));
}
