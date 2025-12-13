import type { TActorConfig, TActorConfigToParamsDependencies, TActorParams } from '@/Engine/Actor/Models';
import type { TModel3dFacade } from '@/Engine/Models3d';
import { configToOptionalParamsBody } from '@/Engine/Physics';
import { configToParamsSpatialData } from '@/Engine/Spatial';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TActorConfig, dependencies: TActorConfigToParamsDependencies): TActorParams {
  const { position, rotation, scale, physics, spatial, model3dEntity, ...rest } = config;

  // TODO 9.0.0. RESOURCES: Failing here, because of primitive models creation.
  //  But at this moment all models should be created and added to the registry.
  //  So, check what's inside the registry (and why it's not there).
  const model3d: TModel3dFacade | undefined = dependencies.models3dService.getRegistry().findByName(model3dEntity);
  if (isNotDefined(model3d)) throw new Error(`Actor. ConfigToParams: Model3d "${model3d}" not found, while actor initialization`);

  return {
    ...rest,
    model3dEntity: model3d,
    spatial: configToParamsSpatialData(spatial, dependencies),
    physics: physics ? configToOptionalParamsBody(physics) : undefined,
    ...configToParamsObject3d({ position, rotation, scale })
  };
}
