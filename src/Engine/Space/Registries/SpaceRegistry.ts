import { AbstractEntityRegistry, RegistryType } from '@/Engine/Abstract';
import type { TSpace, TSpaceRegistry } from '@/Engine/Space/Models';

export const SpaceRegistry = (): TSpaceRegistry => AbstractEntityRegistry<TSpace>(RegistryType.Space);
