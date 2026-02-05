import { AbstractResourceAsyncRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TTexture, TTextureAsyncRegistry } from '@hellpig/anarchy-engine/Texture/Models';

export function TextureResourceAsyncRegistry(): TTextureAsyncRegistry {
  return AbstractResourceAsyncRegistry<TTexture>(RegistryType.Texture);
}
