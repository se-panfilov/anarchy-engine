import { AbstractResourceAsyncRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TTexture, TTextureAsyncRegistry } from '@Anarchy/Engine/Texture/Models';

export function TextureResourceAsyncRegistry(): TTextureAsyncRegistry {
  return AbstractResourceAsyncRegistry<TTexture>(RegistryType.Texture);
}
