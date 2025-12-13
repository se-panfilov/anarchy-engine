import type { AudioListener } from 'three';

import { AbstractSimpleRegistry, RegistryType } from '@/Engine/Abstract';
import type { TAudioListenersRegistry } from '@/Engine/Audio/Models';

export function AudioListenersRegistry(): TAudioListenersRegistry {
  return AbstractSimpleRegistry<AudioListener>(RegistryType.AudioListeners);
}
