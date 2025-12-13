import { FacadeType } from '@/Engine/Abstract';
import { AbstractFacade } from '@/Engine/Abstract/Wrappers/AbstractFacade';
import type { TAnimationsService } from '@/Engine/Animations/Models';
import { withModel3dFacadeEntities } from '@/Engine/Models3d/Mixins';
import type { TModel3dEntities, TModel3dFacade, TModel3dPack, TModels3dFacadeParams } from '@/Engine/Models3d/Models';
import { applyPosition, applyRotation, applyScale } from '@/Engine/Models3d/Services/Models3dServiceHelper';
import type { TOptional } from '@/Engine/Utils';
import { isDefined, omitInObjectWithoutMutation } from '@/Engine/Utils';

import { createModels3dEntities } from './Model3dFacadeUtils';

export function Model3dFacade(params: TModels3dFacadeParams, animationsService: TAnimationsService): TModel3dFacade {
  const entities: TModel3dEntities = createModels3dEntities(params, animationsService);
  const facade = AbstractFacade(withModel3dFacadeEntities(entities), FacadeType.Model3d, params);

  const getPack = (): TModel3dPack => omitInObjectWithoutMutation(entities, ['actions', 'mixer']);

  function _clone(overrides: TOptional<TModel3dPack> = {}): TModel3dFacade {
    const _overrides = omitInObjectWithoutMutation(overrides, ['clonedFrom']);
    return Model3dFacade({ ...getPack(), clonedFrom: facade.id, ..._overrides }, animationsService);
  }

  // TODO (S.Panfilov) CWP test this method, if it works correctly (animations are played for cloned model)
  // Be aware that this clone method doesn't save the facade to the registry, use clone() method of the service instead
  // function _clone(overrides: TOptional<TModel3dPack> = {}): TModel3dFacade {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { clonedFrom, ...overridesRest } = overrides;
  //
  //   // model.traverse((child) => {
  //   //   if ((child as Mesh).isMesh) {
  //   //     if (Array.isArray((child as Mesh).material)) {
  //   //       (child as Mesh).material = (child as Mesh).material.map((material) => material.clone());
  //   //     } else {
  //   //       (child as Mesh).material = (child as Mesh).material.clone();
  //   //     }
  //   //   }
  //   // });
  //
  //   // const animations: TAnimationsPack = {};
  //   // eslint-disable-next-line functional/immutable-data
  //   // if (isNotDefined(overrides?.animations)) Object.entries(entities.animations).forEach(([key, value]: [string, AnimationClip]): void => void (animations[key] = value.clone()));
  //   // if (isNotDefined(overrides?.animations)) {
  //   //   Object.entries(entities.animations).forEach(([key, value]: [string, AnimationClip]): void => {
  //   //     // eslint-disable-next-line functional/immutable-data
  //   //     animations[key] = value.clone();
  //   //   });
  //   // }
  //
  //   return Model3dFacade({ ...getPack(), clonedFrom: facade.id, ...overridesRest }, animationsService);
  // }

  //apply model params
  if (isDefined(params.scale)) applyScale(entities.model, params.scale);
  if (isDefined(params.rotation)) applyRotation(entities.model, params.rotation);
  if (isDefined(params.position)) applyPosition(entities.model, params.position);

  return {
    ...facade,
    getPack,
    _clone
  };
}
