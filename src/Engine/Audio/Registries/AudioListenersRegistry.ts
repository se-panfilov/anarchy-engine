import type { AudioListener } from 'three';

import { AbstractSimpleRegistry, RegistryType } from '@/Engine/Abstract';
import type { TAudioListenersRegistry } from '@/Engine/Audio/Models';

export const AudioListenersRegistry = (): TAudioListenersRegistry => AbstractSimpleRegistry<AudioListener>(RegistryType.AudioListeners);
