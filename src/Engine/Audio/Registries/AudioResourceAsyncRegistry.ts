import { AbstractSimpleAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TAudioResourceAsyncRegistry } from '@/Engine/Audio/Models';

export const AudioResourceAsyncRegistry = (): TAudioResourceAsyncRegistry => RegistryFacade(AbstractSimpleAsyncRegistry<AudioBuffer>(RegistryType.AudioRaw));
