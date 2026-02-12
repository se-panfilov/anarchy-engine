import { AbstractSimpleRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TTextureMetaInfoRegistry, TTextureResourceConfig } from '@Anarchy/Engine/Texture/Models';

export function TextureMetaInfoRegistry(): TTextureMetaInfoRegistry {
  return AbstractSimpleRegistry<TTextureResourceConfig>(RegistryType.TextureMetaInfo);
}
