import { AbstractEntityRegistry, RegistryType } from '@/Engine/Abstract';
import type { TSpace, TSpaceRegistry } from '@/Engine/Space/Models';

export function SpaceRegistry(): TSpaceRegistry {
  return AbstractEntityRegistry<TSpace>(RegistryType.Space);
}
