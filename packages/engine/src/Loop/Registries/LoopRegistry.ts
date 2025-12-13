import { AbstractEntityRegistry, RegistryType } from '@/Abstract';
import type { TLoop, TLoopRegistry } from '@/Loop/Models';

export function LoopRegistry(): TLoopRegistry {
  return AbstractEntityRegistry<TLoop>(RegistryType.Loop);
}
