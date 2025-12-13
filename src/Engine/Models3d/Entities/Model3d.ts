import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import { withObject3d } from '@/Engine/Mixins';
import { withModel3dEntities } from '@/Engine/Models3d/Mixins';
import type { TModel3d, TModel3dDependencies, TModel3dEntities, TModel3dParams } from '@/Engine/Models3d/Models';
import { applyObject3dParamsToModel3d, applyPositionToModel3d, applyRotationToModel3d, applyScaleToModel3d, createModels3dEntities } from '@/Engine/Models3d/Utils';
import type { TOptional } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

export function Model3d(params: TModel3dParams, { animationsService, model3dRawToModel3dConnectionRegistry }: TModel3dDependencies): TModel3d {
  const entities: TModel3dEntities = createModels3dEntities(params, animationsService);

  const isModelAlreadyInUse: boolean = isDefined(model3dRawToModel3dConnectionRegistry.findByModel3d(entities.model3dSource));

  // At the moment we don't allow Model3dFacade to re-use the same model3d resource, because it might lead to unexpected behavior.
  // However, it might be nothing wrong with it, so we can remove the exception throwing and cloning the resource model3d instead (inside "createModels3dEntities()").
  if (isModelAlreadyInUse)
    throw new Error(`Model3dFacade: Trying to create Model3dFacade around model3d resource that is already in use by another Model3dFacade. Might be a mistake. Consider cloning the source instead.`);

  const facade = AbstractEntity(withModel3dEntities(entities), EntityType.Model3d, params);

  const getParams = (): TModel3dParams => ({ ...params });

  // IMPORTANT!!!: This clone() doesn't save the facade to the registry. Consider using of clone() the models3d service instead.
  const _clone = (overrides: TOptional<TModel3dParams> = {}): TModel3d => Model3d({ ...getParams(), forceClone: true, ...overrides }, { animationsService, model3dRawToModel3dConnectionRegistry });

  // TODO 8.0.0. MODELS: apply all the params from object3d (can we do it in a more generic way?)
  // TODO 8.0.0. MODELS: Remove duplication: extract applying of params to utils
  //applying model's params
  if (isDefined(params.scale)) applyScaleToModel3d(entities.model3dSource, params.scale);
  if (isDefined(params.rotation)) applyRotationToModel3d(entities.model3dSource, params.rotation);
  if (isDefined(params.position)) applyPositionToModel3d(entities.model3dSource, params.position);
  applyObject3dParamsToModel3d(entities.model3dSource, params);

  facade.destroyed$.subscribe(() => {
    model3dRawToModel3dConnectionRegistry.removeByModel3d(entities.model3dSource);
    // TODO 8.0.0. MODELS: implement the removal of the model from the scene and destroy of the models (and unload the resources)
  });

  model3dRawToModel3dConnectionRegistry.addModel3d(entities.model3dSource, facade as TModel3d);

  return {
    ...withObject3d(entities.model3dSource),
    ...facade,
    getParams,
    _clone
  };
}
