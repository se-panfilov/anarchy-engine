import { Euler, Vector3 } from 'three';

import type { TActorConfig, TActorConfigToParamsDependencies, TActorModel3dSettings, TActorModel3dSettingsConfig, TActorParams } from '@/Engine/Actor/Models';
import { kinematicConfigToParams } from '@/Engine/Kinematic';
import type { TModel3d } from '@/Engine/Models3d';
import { configToOptionalParamsBody } from '@/Engine/Physics';
import { configToParamsSpatialData } from '@/Engine/Spatial';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TActorConfig, dependencies: TActorConfigToParamsDependencies): TActorParams {
  const { position, rotation, scale, physics, spatial, model3dSource, kinematic, model3dSettings, ...rest } = config;

  const model3d: TModel3d | undefined = dependencies.models3dService.getRegistry().findByName(model3dSource);
  if (isNotDefined(model3d)) throw new Error(`Actor. ConfigToParams: Model3d "${model3dSource}" not found, while actor initialization`);

  // TODO Improvement: Physics could be extracted from Actor to a distinct entity (and we should have physicsSource in Actor)
  return {
    ...rest,
    model3dSource: model3d,
    spatial: configToParamsSpatialData(spatial, dependencies),
    physics: physics ? configToOptionalParamsBody(physics) : undefined,
    kinematic: kinematic ? kinematicConfigToParams(kinematic) : undefined,
    model3dSettings: model3dSettings ? model3dSettingsConfigToParams(model3dSettings) : undefined,
    ...configToParamsObject3d({ position, rotation, scale })
  };
}

function model3dSettingsConfigToParams(settings: TActorModel3dSettingsConfig): TActorModel3dSettings {
  const { positionOffset, rotationOffset, scaleOffset, ...rest } = settings;

  return {
    ...rest,
    positionOffset: isDefined(positionOffset) ? new Vector3(positionOffset.x, positionOffset.y, positionOffset.z) : undefined,
    rotationOffset: isDefined(rotationOffset) ? new Euler(rotationOffset.x, rotationOffset.y, rotationOffset.z) : undefined,
    scaleOffset: isDefined(scaleOffset) ? new Vector3(scaleOffset.x, scaleOffset.y, scaleOffset.z) : undefined
  };
}
