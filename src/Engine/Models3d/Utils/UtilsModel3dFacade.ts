import type { AnimationClip, Object3D } from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';

import type { TAnimationsService } from '@/Engine/Animations/Models';
import type { TModel3dEntities, TModel3dParams } from '@/Engine/Models3d/Models';
import { createPrimitiveModel3d, isPrimitiveModel3dSource } from '@/Engine/Models3d/Utils';

export function createModels3dEntities(params: TModel3dParams, animationsService: TAnimationsService, shouldCloneModel: boolean): TModel3dEntities {
  let model3dSource: Object3D;
  let animationsSource: ReadonlyArray<AnimationClip> = [];

  if (isPrimitiveModel3dSource(params.model3dSource)) {
    model3dSource = createPrimitiveModel3d(params);
  } else {
    animationsSource = params.model3dSource.animations;
    model3dSource = shouldCloneModel ? SkeletonUtils.clone(params.model3dSource.scene) : params.model3dSource.scene;
  }
  const { actions, mixer } = animationsService.createActions(model3dSource, animationsSource);

  return { ...params, model3dSource, animationsSource, actions, mixer };
}
