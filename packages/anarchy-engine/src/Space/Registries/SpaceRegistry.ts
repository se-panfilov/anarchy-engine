import { AbstractEntityRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TSpace, TSpaceRegistry } from '@hellpig/anarchy-engine/Space/Models';

export function SpaceRegistry(): TSpaceRegistry {
  return AbstractEntityRegistry<TSpace>(RegistryType.Space);
}
