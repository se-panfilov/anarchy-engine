import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registry';
import type { IText2dRegistry, IText2dWrapper } from '@/Engine/Text/Models';

export const Text2dRegistry = (): IText2dRegistry => RegistryFacade(AbstractEntityRegistry<IText2dWrapper>(RegistryType.Text));
