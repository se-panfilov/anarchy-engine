import { AbstractResourceAsyncRegistry, RegistryType } from '@/Abstract';
import type { TTexture, TTextureAsyncRegistry } from '@/Texture/Models';

export function TextureResourceAsyncRegistry(): TTextureAsyncRegistry {
  return AbstractResourceAsyncRegistry<TTexture>(RegistryType.Texture);
}
