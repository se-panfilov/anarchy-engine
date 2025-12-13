import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from 'src/Engine/Abstract/Registries';
import type { IFogRegistry, IFogWrapper } from '@/Engine/Fog/Models';

export const FogRegistry = (): IFogRegistry => RegistryFacade(AbstractEntityRegistry<IFogWrapper>(RegistryType.Fog));
