import { AbstractEntityRegistry, RegistryType } from '@Engine/Abstract';
import type { TLoop, TLoopRegistry } from '@Engine/Loop/Models';

export function LoopRegistry(): TLoopRegistry {
  return AbstractEntityRegistry<TLoop>(RegistryType.Loop);
}
