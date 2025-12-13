import { AbstractRegistry, RegistryFacade } from '@/Engine/Domains/Abstract';
import type { ILightRegistry, ILightWrapper } from '@/Engine/Domains/Light/Models';
import { RegistryType } from '@/Engine/Registries';

export const LightRegistry = (): ILightRegistry => RegistryFacade(AbstractRegistry<ILightWrapper>(RegistryType.Light));
