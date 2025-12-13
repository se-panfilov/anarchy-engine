import type { TTextureConfig, TTextureParams } from '@/Engine/Texture/Models';

export function configToParams(config: TTextureConfig): TTextureParams {
  return { ...config };
}
