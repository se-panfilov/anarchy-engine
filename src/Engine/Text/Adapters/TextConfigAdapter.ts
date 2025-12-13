import { Vector2 } from 'three';

import { configToOptionalParamsBody } from '@/Engine/Physics';
import type { TTextConfig, TTextParams } from '@/Engine/Text/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils';

export function configToParams(config: TTextConfig): TTextParams {
  const { position, center, rotation, scale, layers, physics, ...rest } = config;

  let result: TTextParams = {
    ...rest,
    physics: physics ? configToOptionalParamsBody(physics) : undefined,
    ...configToParamsObject3d({ position, rotation, scale, layers })
  };

  if (isDefined(center)) result = { ...result, center: new Vector2(center.x, center.y) };

  return result;
}
