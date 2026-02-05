import { kinematicConfigToParams } from '@hellpig/anarchy-engine/Kinematic';
import type { TTextConfig, TTextParams, TTextServiceDependencies } from '@hellpig/anarchy-engine/Text/Models';
import { object3dConfigToParams } from '@hellpig/anarchy-engine/ThreeLib';
import { isDefined } from '@hellpig/anarchy-shared/Utils';
import { Vector2 } from 'three';

export function textConfigToParams(config: TTextConfig, dependencies: TTextServiceDependencies): TTextParams {
  const { position, center, rotation, scale, layers, physicsBodyName, kinematic, ...rest } = config;

  let result: TTextParams = {
    ...rest,
    physicsBody: isDefined(physicsBodyName) ? dependencies.physicsBodyService.getRegistry().getByName(physicsBodyName) : undefined,
    ...object3dConfigToParams({ position, rotation, scale, layers }),
    kinematic: kinematic ? kinematicConfigToParams(kinematic) : undefined
  };

  if (isDefined(center)) result = { ...result, center: new Vector2(center.x, center.y) };

  return result;
}
