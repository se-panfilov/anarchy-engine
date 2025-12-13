import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TAudio3dWrapper, TAudioRegistry } from '@/Engine/Audio/Models';

// TODO 11.0.0: Do we need connect audio wrapper to audio connection registry?
// TODO 11.0.0: Guess the registry should work not only for 3d sounds (TAudio3dWrapper) but for any audio
export const AudioRegistry = (): TAudioRegistry => RegistryFacade(AbstractEntityRegistry<TAudio3dWrapper>(RegistryType.Audio));
