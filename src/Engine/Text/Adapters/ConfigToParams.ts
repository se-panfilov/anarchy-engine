import { Vector2 } from 'three';

import { kinematicConfigToParams } from '@/Engine/Kinematic';
import { configToParamsBody } from '@/Engine/Physics';
import type { TTextConfig, TTextParams } from '@/Engine/Text/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils';

export function configToParams(config: TTextConfig): TTextParams {
  const { position, center, rotation, scale, layers, physics, kinematic, ...rest } = config;

  let result: TTextParams = {
    ...rest,
    physics: physics ? configToParamsBody(physics) : undefined,
    ...configToParamsObject3d({ position, rotation, scale, layers }),
    kinematic: kinematic ? kinematicConfigToParams(kinematic) : undefined
  };

  if (isDefined(center)) result = { ...result, center: new Vector2(center.x, center.y) };

  return result;
}
