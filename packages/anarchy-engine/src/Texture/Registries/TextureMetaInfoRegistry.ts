import { AbstractSimpleRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TTextureMetaInfoRegistry, TTextureResourceConfig } from '@hellpig/anarchy-engine/Texture/Models';

export function TextureMetaInfoRegistry(): TTextureMetaInfoRegistry {
  return AbstractSimpleRegistry<TTextureResourceConfig>(RegistryType.TextureMetaInfo);
}
