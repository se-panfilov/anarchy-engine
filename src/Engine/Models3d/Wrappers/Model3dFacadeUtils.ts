import type { Object3D } from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';

import type { TAnimationsService } from '@/Engine/Animations/Models';
import type { TModel3dEntities, TModels3dFacadeParams, TModels3dPrimitiveFacadeParams } from '@/Engine/Models3d/Models';
import { isPrimitive } from '@/Engine/Models3d/Services/Models3dServiceHelper';

export function createModels3dEntities(params: TModels3dFacadeParams | TModels3dPrimitiveFacadeParams, animationsService: TAnimationsService): TModel3dEntities {
  if (isPrimitive(params)) return { ...params, model: params.model.clone(), animations: [], actions: {}, mixer: undefined };

  const model: Object3D = SkeletonUtils.clone(params.model);
  const { actions, mixer } = animationsService.createActions(model, params.animations ?? {});

  return { ...params, model, actions, mixer };
}
