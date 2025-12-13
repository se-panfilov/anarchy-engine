import { AbstractResourceAsyncRegistry, RegistryType } from '@/Engine/Abstract';
import type { TAudioResourceAsyncRegistry } from '@/Engine/Audio/Models';

export function AudioResourceAsyncRegistry(): TAudioResourceAsyncRegistry {
  return AbstractResourceAsyncRegistry<AudioBuffer>(RegistryType.AudioRaw);
}
