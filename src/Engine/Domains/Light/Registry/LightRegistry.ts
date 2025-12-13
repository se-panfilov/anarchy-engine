import { AbstractRegistry, RegistryFacade, RegistryType } from '@/Engine/Domains/Abstract';
import type { ILightRegistry, ILightWrapper } from '@/Engine/Domains/Light/Models';

export const LightRegistry = (): ILightRegistry => RegistryFacade(AbstractRegistry<ILightWrapper>(RegistryType.Light));
