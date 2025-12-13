import { AbstractEntityRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TLoop, TLoopRegistry } from '@Anarchy/Engine/Loop/Models';

export function LoopRegistry(): TLoopRegistry {
  return AbstractEntityRegistry<TLoop>(RegistryType.Loop);
}
