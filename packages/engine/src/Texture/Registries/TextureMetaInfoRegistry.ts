import { AbstractSimpleRegistry, RegistryType } from '@/Engine/Abstract';
import type { TTextureMetaInfoRegistry, TTextureResourceConfig } from '@/Engine/Texture/Models';

export function TextureMetaInfoRegistry(): TTextureMetaInfoRegistry {
  return AbstractSimpleRegistry<TTextureResourceConfig>(RegistryType.TextureMetaInfo);
}
