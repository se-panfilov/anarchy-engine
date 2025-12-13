import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { IText2dRegistry, TText2dWrapper } from '@/Engine/Text/Models';

export const Text2dRegistry = (): IText2dRegistry => RegistryFacade(AbstractEntityRegistry<TText2dWrapper>(RegistryType.Text));
