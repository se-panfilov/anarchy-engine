import { AbstractSimpleAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TTexture, TTextureAsyncRegistry } from '@/Engine/Texture/Models';

export const TextureAsyncRegistry = (): TTextureAsyncRegistry => RegistryFacade(AbstractSimpleAsyncRegistry<TTexture>(RegistryType.Texture));
