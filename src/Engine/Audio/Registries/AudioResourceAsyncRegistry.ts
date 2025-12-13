import { AbstractSimpleAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TAudioResourceAsyncRegistry } from '@/Engine/Audio/Models';

// TODO 11.0.0: make sure we need this registry (and check if we need a connection registry, as we do for models3d)
// TODO 11.0.0: Guess the registry should work not only for 3d sounds (TAudio3dWrapper) but for any audio
export const AudioResourceAsyncRegistry = (): TAudioResourceAsyncRegistry => RegistryFacade(AbstractSimpleAsyncRegistry<AudioBuffer>(RegistryType.AudioRaw));
