import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TFogRegistry, TFogWrapper } from '@/Engine/Fog/Models';

export const FogRegistry = (): TFogRegistry => RegistryFacade(AbstractEntityRegistry<TFogWrapper>(RegistryType.Fog));
