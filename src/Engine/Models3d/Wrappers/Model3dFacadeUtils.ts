import type { Object3D } from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';

import type { TAnimationsService } from '@/Engine/Animations/Models';
import type { TModel3dEntities, TModels3dFacadeParams } from '@/Engine/Models3d/Models';

export function createModels3dEntities(params: TModels3dFacadeParams, animationsService: TAnimationsService): TModel3dEntities {
  const model: Object3D = SkeletonUtils.clone(params.model);
  const { actions, mixer } = animationsService.createActions(model, params.animations ?? {});

  // TODO do we need to clone animations?
  // const animations: TAnimationsPack = {};
  // eslint-disable-next-line functional/immutable-data
  // Object.entries(params.animations).forEach(([key, value]: [string, AnimationClip]): void => void (animations[key] = value.clone()));

  // TODO debug
  // if (actions && actions['Run']) console.log(actions['Run'].getMixer());
  // return { ...params, model, animations, actions, mixer };
  return { ...params, model, actions, mixer };
}
