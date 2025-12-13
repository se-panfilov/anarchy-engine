import { AbstractSimpleRegistry, RegistryType } from '@Engine/Abstract';
import type { TAudioListenersRegistry } from '@Engine/Audio/Models';
import type { AudioListener } from 'three';

export function AudioListenersRegistry(): TAudioListenersRegistry {
  return AbstractSimpleRegistry<AudioListener>(RegistryType.AudioListeners);
}
