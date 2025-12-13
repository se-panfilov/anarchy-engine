import { AbstractSimpleAsyncRegistry, RegistryType } from '@/Engine/Abstract';
import type { TTexture, TTextureAsyncRegistry } from '@/Engine/Texture/Models';

export const TextureAsyncRegistry = (): TTextureAsyncRegistry => AbstractSimpleAsyncRegistry<TTexture>(RegistryType.Texture);
