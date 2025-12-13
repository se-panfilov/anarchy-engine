import { Vector2 } from 'three';

import { kinematicConfigToParams } from '@/Engine/Kinematic';
import type { TTextConfig, TTextParams, TTextServiceDependencies } from '@/Engine/Text/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils';

export function configToParams(config: TTextConfig, dependencies: TTextServiceDependencies): TTextParams {
  const { position, center, rotation, scale, layers, physicBodyName, kinematic, ...rest } = config;

  let result: TTextParams = {
    ...rest,
    physicBody: isDefined(physicBodyName) ? dependencies.physicsBodyService.getRegistry().getByName(physicBodyName) : undefined,
    ...configToParamsObject3d({ position, rotation, scale, layers }),
    kinematic: kinematic ? kinematicConfigToParams(kinematic) : undefined
  };

  if (isDefined(center)) result = { ...result, center: new Vector2(center.x, center.y) };

  return result;
}
