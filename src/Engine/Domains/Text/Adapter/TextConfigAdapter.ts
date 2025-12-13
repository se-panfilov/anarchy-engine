import type { ITextConfig, ITextParams } from '@/Engine/Domains/Text/Models';
import { Vector3Wrapper } from '@/Engine/Wrappers';

export function getParams(config: ITextConfig): ITextParams {
  const { position, ...rest } = config;
  return {
    ...rest,
    position: Vector3Wrapper(position)
  };
}
