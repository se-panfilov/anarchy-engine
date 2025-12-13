import { AbstractSimpleRegistry, RegistryType } from '@/Abstract';
import type { TTextureMetaInfoRegistry, TTextureResourceConfig } from '@/Texture/Models';

export function TextureMetaInfoRegistry(): TTextureMetaInfoRegistry {
  return AbstractSimpleRegistry<TTextureResourceConfig>(RegistryType.TextureMetaInfo);
}
