import { AbstractSimpleRegistry, RegistryType } from '@/Engine/Abstract';
import type { TTextureMetaInfoRegistry, TTextureResourceConfig } from '@/Engine/Texture/Models';

export const TextureMetaInfoRegistry = (): TTextureMetaInfoRegistry => AbstractSimpleRegistry<TTextureResourceConfig>(RegistryType.TextureMetaInfo);
