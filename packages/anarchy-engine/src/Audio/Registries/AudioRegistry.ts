import { AbstractEntityRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TAnyAudioWrapper, TAudioRegistry } from '@hellpig/anarchy-engine/Audio/Models';

export function AudioRegistry(): TAudioRegistry {
  return AbstractEntityRegistry<TAnyAudioWrapper>(RegistryType.Audio);
}
