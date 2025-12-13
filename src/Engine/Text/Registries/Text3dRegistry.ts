import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from 'src/Engine/Abstract/Registries';
import type { IText3dRegistry, IText3dWrapper } from '@/Engine/Text/Models';

export const Text3dRegistry = (): IText3dRegistry => RegistryFacade(AbstractEntityRegistry<IText3dWrapper>(RegistryType.Text));
