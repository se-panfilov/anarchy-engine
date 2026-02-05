import { AbstractSimpleRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TAudioListenersRegistry } from '@hellpig/anarchy-engine/Audio/Models';
import type { AudioListener } from 'three';

export function AudioListenersRegistry(): TAudioListenersRegistry {
  return AbstractSimpleRegistry<AudioListener>(RegistryType.AudioListeners);
}
