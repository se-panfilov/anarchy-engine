import type { TTexturePackConfig, TTexturePackParams } from '@/Engine/Texture/Models';

export function configToParams(config: TTexturePackConfig): TTexturePackParams {
  return { ...config };
}
