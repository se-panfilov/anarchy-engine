import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TAnyAudioWrapper, TAudioRegistry } from '@/Engine/Audio/Models';

export const AudioRegistry = (): TAudioRegistry => RegistryFacade(AbstractEntityRegistry<TAnyAudioWrapper>(RegistryType.Audio));
