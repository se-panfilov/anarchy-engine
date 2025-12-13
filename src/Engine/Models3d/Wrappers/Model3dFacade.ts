import { FacadeType } from '@/Engine/Abstract';
import { AbstractFacade } from '@/Engine/Abstract/Wrappers/AbstractFacade';
import { withModel3dFacadeEntities } from '@/Engine/Models3d/Mixins';
import type { TModel3dEntities, TModel3dFacade, TModel3dFacadeDependencies, TModel3dParams } from '@/Engine/Models3d/Models';
import { applyCastShadowToModel3d, applyPositionToModel3d, applyReceiveShadowToModel3d, applyRotationToModel3d, applyScaleToModel3d, createModels3dEntities } from '@/Engine/Models3d/Utils';
import type { TOptional } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

export function Model3dFacade(params: TModel3dParams, { animationsService }: TModel3dFacadeDependencies): TModel3dFacade {
  const shouldCloneModel3d: boolean = false;
  const entities: TModel3dEntities = createModels3dEntities(params, animationsService, shouldCloneModel3d);
  const facade = AbstractFacade(withModel3dFacadeEntities(entities), FacadeType.Model3d, params);

  const getParams = (): TModel3dParams => ({ ...params });

  // IMPORTANT!!!: This clone() doesn't save the facade to the registry. Consider using of clone() the models3d service instead.
  const _clone = (overrides: TOptional<TModel3dParams> = {}): TModel3dFacade => Model3dFacade({ ...getParams(), ...overrides }, { animationsService });

  // TODO 8.0.0. MODELS: apply all the params from object3d (can we do it in a more generic way?)
  // TODO 8.0.0. MODELS: Remove duplication: extract applying of params to utils
  //applying model's params
  if (isDefined(params.scale)) applyScaleToModel3d(entities.model3dSource, params.scale);
  if (isDefined(params.rotation)) applyRotationToModel3d(entities.model3dSource, params.rotation);
  if (isDefined(params.position)) applyPositionToModel3d(entities.model3dSource, params.position);
  if (isDefined(params.castShadow)) applyCastShadowToModel3d(entities.model3dSource, params.castShadow);
  if (isDefined(params.receiveShadow)) applyReceiveShadowToModel3d(entities.model3dSource, params.receiveShadow);

  // TODO 9.0.0. RESOURCES: add facade id to model3d's userData
  return {
    ...facade,
    getParams,
    _clone
  };
}
