import type { TTexturePackParams, TTextureResourceConfig } from '@/Engine/Texture/Models';

export function configToParams(config: TTextureResourceConfig): TTexturePackParams {
  return { ...config };
}
