import { kinematicConfigToParams } from '@Anarchy/Engine/Kinematic';
import type { TTextConfig, TTextParams, TTextServiceDependencies } from '@Anarchy/Engine/Text/Models';
import { configToParamsObject3d } from '@Anarchy/Engine/ThreeLib';
import { isDefined } from '@Shared/Utils';
import { Vector2 } from 'three';

export function configToParams(config: TTextConfig, dependencies: TTextServiceDependencies): TTextParams {
  const { position, center, rotation, scale, layers, physicsBodyName, kinematic, ...rest } = config;

  let result: TTextParams = {
    ...rest,
    physicsBody: isDefined(physicsBodyName) ? dependencies.physicsBodyService.getRegistry().getByName(physicsBodyName) : undefined,
    ...configToParamsObject3d({ position, rotation, scale, layers }),
    kinematic: kinematic ? kinematicConfigToParams(kinematic) : undefined
  };

  if (isDefined(center)) result = { ...result, center: new Vector2(center.x, center.y) };

  return result;
}
