import { AbstractResourceAsyncRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TAudioResourceAsyncRegistry } from '@Anarchy/Engine/Audio/Models';

export function AudioResourceAsyncRegistry(): TAudioResourceAsyncRegistry {
  return AbstractResourceAsyncRegistry<AudioBuffer>(RegistryType.AudioRaw);
}
