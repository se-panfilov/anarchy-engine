import { AbstractRegistry, RegistryFacade } from '@/Engine/Domains/Abstract';
import type { ITextAnyWrapper, ITextRegistry } from '@/Engine/Domains/Text/Models';
import { RegistryType } from '@/Engine/Registries';

export const TextRegistry = (): ITextRegistry => RegistryFacade(AbstractRegistry<ITextAnyWrapper>(RegistryType.Text));
