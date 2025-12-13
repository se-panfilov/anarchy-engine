import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TText3dRegistry, TText3dWrapper } from '@/Engine/Text/Models';

export const Text3dRegistry = (): TText3dRegistry => RegistryFacade(AbstractEntityRegistry<TText3dWrapper>(RegistryType.Text3d));
