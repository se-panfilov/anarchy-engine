import { AbstractResourceAsyncRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TAudioResourceAsyncRegistry } from '@hellpig/anarchy-engine/Audio/Models';

export function AudioResourceAsyncRegistry(): TAudioResourceAsyncRegistry {
  return AbstractResourceAsyncRegistry<AudioBuffer>(RegistryType.AudioRaw);
}
