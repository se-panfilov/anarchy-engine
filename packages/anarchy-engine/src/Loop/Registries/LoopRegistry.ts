import { AbstractEntityRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TLoop, TLoopRegistry } from '@hellpig/anarchy-engine/Loop/Models';

export function LoopRegistry(): TLoopRegistry {
  return AbstractEntityRegistry<TLoop>(RegistryType.Loop);
}
