import { AbstractEntityRegistry, RegistryType } from '@/Engine/Abstract';
import type { TAnyAudioWrapper, TAudioRegistry } from '@/Engine/Audio/Models';

export const AudioRegistry = (): TAudioRegistry => AbstractEntityRegistry<TAnyAudioWrapper>(RegistryType.Audio);
