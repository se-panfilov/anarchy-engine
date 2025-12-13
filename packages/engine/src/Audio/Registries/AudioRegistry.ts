import { AbstractEntityRegistry, RegistryType } from '@/Abstract';
import type { TAnyAudioWrapper, TAudioRegistry } from '@/Audio/Models';

export function AudioRegistry(): TAudioRegistry {
  return AbstractEntityRegistry<TAnyAudioWrapper>(RegistryType.Audio);
}
