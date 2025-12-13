import type { ITextConfig, ITextParams } from '@/Engine/Domains/Text/Models';
import { configToParamsObject3d } from '@/Engine/Domains/ThreeLib';
import { Vector2Wrapper } from '@/Engine/Domains/Vector';
import { isDefined } from '@/Engine/Utils';

export function configToParams(config: ITextConfig): ITextParams {
  const { position, center, rotation, scale, layers, animations, ...rest } = config;

  let result: ITextParams = {
    ...rest,
    ...configToParamsObject3d({ position, rotation, scale, layers, animations })
  };

  if (isDefined(center)) result = { ...result, center: Vector2Wrapper(center) };

  return result;
}
