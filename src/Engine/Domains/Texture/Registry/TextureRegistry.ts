import { AbstractRegistry, RegistryFacade } from '@/Engine/Domains/Abstract';
import type { ITextureRegistry, ITextureWrapper } from '@/Engine/Domains/Texture/Models';
import { RegistryType } from '@/Engine/Registries';

export const TextureRegistry = (): ITextureRegistry => RegistryFacade(AbstractRegistry<ITextureWrapper>(RegistryType.Texture));
