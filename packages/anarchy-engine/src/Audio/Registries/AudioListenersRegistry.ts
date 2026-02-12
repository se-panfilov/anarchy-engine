import { AbstractSimpleRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TAudioListenersRegistry } from '@Anarchy/Engine/Audio/Models';
import type { AudioListener } from 'three';

export function AudioListenersRegistry(): TAudioListenersRegistry {
  return AbstractSimpleRegistry<AudioListener>(RegistryType.AudioListeners);
}
