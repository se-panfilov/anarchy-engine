import type { ITextConfig, ITextParams } from '@/Engine/Domains/Text/Models';
import { configToParamsObject3d } from '@/Engine/Domains/ThreeLib';

export function configToParams(config: ITextConfig): ITextParams {
  const { position, rotation, scale, layers, animations, ...rest } = config;

  const result: ITextParams = {
    ...rest,
    ...configToParamsObject3d({ position, rotation, scale, layers, animations })
  };

  return result;
}
