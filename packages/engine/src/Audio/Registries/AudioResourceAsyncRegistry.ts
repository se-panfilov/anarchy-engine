import { AbstractResourceAsyncRegistry, RegistryType } from '@/Abstract';
import type { TAudioResourceAsyncRegistry } from '@/Audio/Models';

export function AudioResourceAsyncRegistry(): TAudioResourceAsyncRegistry {
  return AbstractResourceAsyncRegistry<AudioBuffer>(RegistryType.AudioRaw);
}
