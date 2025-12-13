import type { Object3D } from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';

import type { TAnimationsService } from '@/Engine/Animations/Models';
import type { TModel3dEntities, TModel3dParams } from '@/Engine/Models3d/Models';
import { createPrimitiveModel3d, isPrimitiveModel3dSource } from '@/Engine/Models3d/Utils';

export function createModels3dEntities(params: TModel3dParams, animationsService: TAnimationsService): TModel3dEntities {
  const model3dSource: Object3D = isPrimitiveModel3dSource(params.model3dSource) ? createPrimitiveModel3d(params) : SkeletonUtils.clone(params.model3dSource);
  const { actions, mixer } = animationsService.createActions(model3dSource, params.animationsSource ?? {});

  return { ...params, model3dSource, actions, mixer };
}
