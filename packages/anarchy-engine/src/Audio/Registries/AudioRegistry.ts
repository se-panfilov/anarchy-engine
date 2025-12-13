import { AbstractEntityRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TAnyAudioWrapper, TAudioRegistry } from '@Anarchy/Engine/Audio/Models';

export function AudioRegistry(): TAudioRegistry {
  return AbstractEntityRegistry<TAnyAudioWrapper>(RegistryType.Audio);
}
