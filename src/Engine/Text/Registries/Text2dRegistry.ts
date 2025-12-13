import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from 'src/Engine/Abstract/Registries';
import type { IText2dRegistry, IText2dWrapper } from '@/Engine/Text/Models';

export const Text2dRegistry = (): IText2dRegistry => RegistryFacade(AbstractEntityRegistry<IText2dWrapper>(RegistryType.Text));
