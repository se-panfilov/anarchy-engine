import { AbstractRegistry, RegistryFacade } from '@/Engine/Domains/Abstract';
import type { ITextRegistry, ITextWrapper } from '@/Engine/Domains/Text/Models';
import { RegistryType } from '@/Engine/Registries';

export const TextRegistry = (): ITextRegistry => RegistryFacade(AbstractRegistry<ITextWrapper>(RegistryType.Text));
