import type { Subscription } from 'rxjs';

import type { TAbstractEntity } from '@/Engine/Abstract';
import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import { withObject3d } from '@/Engine/Mixins';
import { model3dToConfig } from '@/Engine/Models3d/Adapters';
import { withModel3dEntities } from '@/Engine/Models3d/Mixins';
import type { TModel3d, TModel3dConfig, TModel3dDependencies, TModel3dEntities, TModel3dParams, TWithModel3dEntities } from '@/Engine/Models3d/Models';
import { applyObject3dParamsToModel3d, applyPositionToModel3d, applyRotationToModel3d, applyScaleToModel3d, createModels3dEntities, isModel3dAlreadyInUse } from '@/Engine/Models3d/Utils';
import type { TOptional } from '@/Engine/Utils';
import { destroyModel3dAnimationEntities, disposeGltf, isDefined } from '@/Engine/Utils';

export function Model3d(params: TModel3dParams, { animationsService, model3dRawToModel3dConnectionRegistry }: TModel3dDependencies): TModel3d {
  const shouldForceClone: boolean = params.forceClone ?? isModel3dAlreadyInUse(params.model3dSource, model3dRawToModel3dConnectionRegistry);
  let entities: TModel3dEntities = createModels3dEntities({ ...params, forceClone: shouldForceClone }, animationsService);
  const abstract: TAbstractEntity<TWithModel3dEntities> = AbstractEntity(withModel3dEntities(entities), EntityType.Model3d, params);

  const getParams = (): TModel3dParams => ({ ...params });

  // IMPORTANT!!!: This clone() doesn't save the model3d to the registry. Consider using of clone() the models3d service instead.
  const _clone = (overrides: TOptional<TModel3dParams> = {}): TModel3d =>
    Model3d(
      {
        ...getParams(),
        forceClone: true,
        ...overrides
      },
      { animationsService, model3dRawToModel3dConnectionRegistry }
    );

  // Maybe we should apply all the params from object3d (can we do it in a more generic way?)
  //applying model's params
  if (isDefined(params.scale)) applyScaleToModel3d(abstract.getRawModel3d(), params.scale);
  if (isDefined(params.rotation)) applyRotationToModel3d(abstract.getRawModel3d(), params.rotation);
  if (isDefined(params.position)) applyPositionToModel3d(abstract.getRawModel3d(), params.position);
  applyObject3dParamsToModel3d(abstract.getRawModel3d(), params);

  model3dRawToModel3dConnectionRegistry.addModel3d(abstract.getRawModel3d(), abstract as TModel3d);

  const preResult = withObject3d(abstract.getRawModel3d());
  // eslint-disable-next-line functional/immutable-data
  const result: TModel3d = Object.assign(preResult, abstract, {
    getParams,
    _clone,
    serialize: (): TModel3dConfig => model3dToConfig(result)
  });

  const destroySub$: Subscription = abstract.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    model3dRawToModel3dConnectionRegistry.removeByModel3d(result.getRawModel3d(), true);

    destroyModel3dAnimationEntities(abstract);

    // TODO MODELS: This is not tested yet. This dispose function could remove resources (e.g. textures) that could be used by other models.
    disposeGltf(abstract.getRawModel3d());
    entities = null as any;
  });

  return result;
}
