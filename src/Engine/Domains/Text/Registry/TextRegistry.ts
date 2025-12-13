import { AbstractRegistry, RegistryFacade } from '@/Engine/Domains/Abstract';
import type { IText2dWrapper, IText3dWrapper, ITextRegistry } from '@/Engine/Domains/Text/Models';
import { RegistryType } from '@/Engine/Registries';

export const TextRegistry = (): ITextRegistry => RegistryFacade(AbstractRegistry<IText2dWrapper | IText3dWrapper>(RegistryType.Text));
