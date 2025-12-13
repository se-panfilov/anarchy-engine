import type { Object3D } from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';

import type { TAnimationsService } from '@/Engine/Animations/Models';
import type { TModel3dComplexEntities, TModel3dComplexFacadeParams, TModel3dPrimitiveEntities, TModels3dPrimitiveFacadeParams } from '@/Engine/Models3d/Models';
import { isPrimitive } from '@/Engine/Models3d/Services/Models3dServiceHelper';

export function createModels3dEntities(params: TModel3dComplexFacadeParams, animationsService: TAnimationsService): TModel3dComplexEntities {
  if (isPrimitive(params)) throw new Error(`Attempting to create a complex 3d model from a primitive model`);

  const model: Object3D = SkeletonUtils.clone(params.model);
  const { actions, mixer } = animationsService.createActions(model, params.animations ?? {});

  return { ...params, model, actions, mixer };
}

export function createModels3dPrimitiveEntities(params: TModels3dPrimitiveFacadeParams): TModel3dPrimitiveEntities {
  if (!isPrimitive(params)) throw new Error(`Attempting to create primitive model3d entities from a complex model`);
  return { ...params, model: params.model.clone() };
}
