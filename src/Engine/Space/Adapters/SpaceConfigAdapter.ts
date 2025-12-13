import type { TSpaceConfig, TSpaceParams } from '@/Engine/Space/Models';
import { validateConfig } from '@/Engine/Space/Validators';

export function configToParams(config: TSpaceConfig): TSpaceParams {
  const { ...rest } = config;

  hooks?.beforeConfigValidation?.(params);
  validateConfig(config);

  return {
    ...rest
  };
}
