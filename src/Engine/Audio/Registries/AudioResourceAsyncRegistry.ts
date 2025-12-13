import { AbstractSimpleAsyncRegistry, RegistryType } from '@/Engine/Abstract';
import type { TAudioResourceAsyncRegistry } from '@/Engine/Audio/Models';

export const AudioResourceAsyncRegistry = (): TAudioResourceAsyncRegistry => AbstractSimpleAsyncRegistry<AudioBuffer>(RegistryType.AudioRaw);
