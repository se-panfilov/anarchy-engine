import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IFogRegistry, IFogWrapper } from '@/Engine/Fog/Models';

export const FogRegistry = (): IFogRegistry => RegistryFacade(AbstractEntityRegistry<IFogWrapper>(RegistryType.Fog));
