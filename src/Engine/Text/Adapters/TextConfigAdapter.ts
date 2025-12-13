import type { TTextConfig, TTextParams } from '@/Engine/Text/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils';
import { Vector2Wrapper } from '@/Engine/Vector';

export function configToParams(config: TTextConfig): TTextParams {
  const { position, center, rotation, scale, layers, animations, ...rest } = config;

  let result: TTextParams = {
    ...rest,
    ...configToParamsObject3d({ position, rotation, scale, layers, animations })
  };

  if (isDefined(center)) result = { ...result, center: Vector2Wrapper(center) };

  return result;
}
