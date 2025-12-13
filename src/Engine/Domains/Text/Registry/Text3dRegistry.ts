import { AbstractRegistry, RegistryFacade } from '@/Engine/Domains/Abstract';
import type { IText3dRegistry, IText3dWrapper } from '@/Engine/Domains/Text/Models';
import { RegistryType } from '@/Engine/Registries';

export const Text3dRegistry = (): IText3dRegistry => RegistryFacade(AbstractRegistry<IText3dWrapper>(RegistryType.Text));
