import type { TActorConfig, TActorConfigToParamsDependencies, TActorParams } from '@/Engine/Actor/Models';
import type { TModel3dFacade } from '@/Engine/Models3d';
import { configToOptionalParamsBody } from '@/Engine/Physics';
import { configToParamsSpatialData } from '@/Engine/Spatial';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TActorConfig, dependencies: TActorConfigToParamsDependencies): TActorParams {
  const { position, rotation, scale, physics, spatial, model3dEntity, ...rest } = config;

  const model3d: TModel3dFacade | undefined = dependencies.models3dService.getRegistry().findByName(model3dEntity);
  if (isNotDefined(model3d)) throw new Error(`Actor. ConfigToParams: Model3d "${model3dEntity}" not found, while actor initialization`);

  // TODO 9.0.0. RESOURCES: 1. "castShadow" and "receiveShadow" props both existed in Actor and Model3d. Should be existed only in one or another (probably model3d)
  // TODO 9.0.0. RESOURCES: 2. Physics should be extracted from Actor to a distinct entity (and we should have physicsSource in Actor)
  return {
    ...rest,
    model3dEntity: model3d,
    spatial: configToParamsSpatialData(spatial, dependencies),
    physics: physics ? configToOptionalParamsBody(physics) : undefined,
    ...configToParamsObject3d({ position, rotation, scale })
  };
}
