import type { TSpaceConfig, TSpaceParams } from '@/Engine/Space/Models';

export function configToParams(config: TSpaceConfig): TSpaceParams {
  const { ...rest } = config;

  return {
    ...rest
  };
}
