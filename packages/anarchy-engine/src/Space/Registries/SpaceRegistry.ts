import { AbstractEntityRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TSpace, TSpaceRegistry } from '@Anarchy/Engine/Space/Models';

export function SpaceRegistry(): TSpaceRegistry {
  return AbstractEntityRegistry<TSpace>(RegistryType.Space);
}
