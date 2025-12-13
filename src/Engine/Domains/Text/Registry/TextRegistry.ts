import { AbstractRegistry, RegistryFacade } from '@/Engine/Domains/Abstract';
import type { IText2dWrapper, ITextRegistry } from '@/Engine/Domains/Text/Models';
import { RegistryType } from '@/Engine/Registries';

export const TextRegistry = (): ITextRegistry => RegistryFacade(AbstractRegistry<IText2dWrapper>(RegistryType.Text));
