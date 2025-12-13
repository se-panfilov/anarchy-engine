import type { Object3D } from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';

import type { TAnimationsService } from '@/Engine/Animations/Models';
import type { TModel3dEntities, TModel3dFacadeParams } from '@/Engine/Models3d/Models';

export function createModels3dEntities(params: TModel3dFacadeParams, animationsService: TAnimationsService): TModel3dEntities {
  const model: Object3D = SkeletonUtils.clone(params.model);
  const { actions, mixer } = animationsService.createActions(model, params.animations ?? {});

  return { ...params, model, actions, mixer };
}
