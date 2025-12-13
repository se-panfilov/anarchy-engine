import { AbstractRegistry, RegistryFacade } from '@/Engine/Domains/Abstract';
import type { IText2dRegistry, IText2dWrapper } from '@/Engine/Domains/Text/Models';
import { RegistryType } from '@/Engine/Registries';

export const Text2dRegistry = (): IText2dRegistry => RegistryFacade(AbstractRegistry<IText2dWrapper>(RegistryType.Text));
