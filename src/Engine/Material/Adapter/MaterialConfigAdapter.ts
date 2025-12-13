import type { IMaterialConfig, IMaterialParams } from '@/Engine/Material/Models';

export function configToParams(config: IMaterialConfig): IMaterialParams {
  const { position, rotation, layers, animations, scale, ...rest } = config;

  return {
    ...rest
  };
}
