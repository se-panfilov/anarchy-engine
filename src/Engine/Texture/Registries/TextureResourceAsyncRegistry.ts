import { AbstractResourceAsyncRegistry, RegistryType } from '@/Engine/Abstract';
import type { TTexture, TTextureAsyncRegistry } from '@/Engine/Texture/Models';

export function TextureResourceAsyncRegistry(): TTextureAsyncRegistry {
  return AbstractResourceAsyncRegistry<TTexture>(RegistryType.Texture);
}
