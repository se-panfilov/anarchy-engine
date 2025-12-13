import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TEnvMapRegistry, TEnvMapWrapper } from '@/Engine/EnvMap/Models';

export const EnvMapRegistry = (): TEnvMapRegistry => RegistryFacade(AbstractEntityRegistry<TEnvMapWrapper>(RegistryType.EnvMap));
