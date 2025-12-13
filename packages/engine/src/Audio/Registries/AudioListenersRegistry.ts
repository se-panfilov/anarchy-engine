import type { AudioListener } from 'three';

import { AbstractSimpleRegistry, RegistryType } from '@/Abstract';
import type { TAudioListenersRegistry } from '@/Audio/Models';

export function AudioListenersRegistry(): TAudioListenersRegistry {
  return AbstractSimpleRegistry<AudioListener>(RegistryType.AudioListeners);
}
