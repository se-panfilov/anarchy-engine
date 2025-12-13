import { AbstractRegistry, RegistryFacade, RegistryName } from '@Engine/Registries';
import type { ILightRegistry, ILightWrapper } from '@Engine/Domains/Light/Models';

export const LightRegistry = (): ILightRegistry => RegistryFacade(AbstractRegistry<ILightWrapper>(RegistryName.Light));
