import type { TModels3dConfig, TModels3dParams } from '@/Engine/Models3d/Models';

export function configToParams(config: TModels3dConfig): TModels3dParams {
  const { ...rest } = config;

  // TODO Implement
  return {
    ...rest
  };
}
