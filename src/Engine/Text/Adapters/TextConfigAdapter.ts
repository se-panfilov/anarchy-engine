import { Vector2 } from 'three';

import type { TTextConfig, TTextParams } from '@/Engine/Text/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils';

export function configToParams(config: TTextConfig): TTextParams {
  const { position, center, rotation, scale, layers, ...rest } = config;

  let result: TTextParams = {
    ...rest,
    ...configToParamsObject3d({ position, rotation, scale, layers })
  };

  if (isDefined(center)) result = { ...result, center: new Vector2(center.x, center.y) };

  return result;
}
