import { AbstractEntityRegistry, RegistryType } from '@/Abstract';
import type { TSpace, TSpaceRegistry } from '@/Space/Models';

export function SpaceRegistry(): TSpaceRegistry {
  return AbstractEntityRegistry<TSpace>(RegistryType.Space);
}
