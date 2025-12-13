import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TText3dTextureRegistry, TText3dTextureWrapper } from '@/Engine/Text/Models';

export const Text3dTextureRegistry = (): TText3dTextureRegistry => RegistryFacade(AbstractEntityRegistry<TText3dTextureWrapper>(RegistryType.Text3dTexture));
