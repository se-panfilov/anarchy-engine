import { AbstractEntityRegistry, RegistryType } from '@Engine/Abstract';
import type { TAnyAudioWrapper, TAudioRegistry } from '@Engine/Audio/Models';

export function AudioRegistry(): TAudioRegistry {
  return AbstractEntityRegistry<TAnyAudioWrapper>(RegistryType.Audio);
}
