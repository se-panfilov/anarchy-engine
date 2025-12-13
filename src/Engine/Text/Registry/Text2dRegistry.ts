import { AbstractRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IText2dRegistry, IText2dWrapper } from '@/Engine/Text/Models';

export const Text2dRegistry = (): IText2dRegistry => RegistryFacade(AbstractRegistry<IText2dWrapper>(RegistryType.Text));
