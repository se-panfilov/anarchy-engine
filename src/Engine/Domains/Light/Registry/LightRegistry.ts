import { AbstractRegistry } from '@Engine/Domains/Abstract';
import type { ILightRegistry, ILightWrapper } from '@Engine/Domains/Light';
import { RegistryFacade, RegistryName } from '@Engine/Registries';

export const LightRegistry = (): ILightRegistry => RegistryFacade(AbstractRegistry<ILightWrapper>(RegistryName.Light));
