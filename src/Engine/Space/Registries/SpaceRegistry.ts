import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TSpace, TSpaceRegistry } from '@/Engine/Space/Models';

export const SpaceRegistry = (): TSpaceRegistry => RegistryFacade(AbstractEntityRegistry<TSpace>(RegistryType.Space));
