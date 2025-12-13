import type { AudioListener } from 'three';

import { AbstractSimpleRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TAudioListenersRegistry } from '@/Engine/Audio/Models';

export const AudioListenersRegistry = (): TAudioListenersRegistry => RegistryFacade(AbstractSimpleRegistry<AudioListener>(RegistryType.AudioListeners));
