import { AbstractSimpleRegistry, RegistryType } from '@/Engine/Abstract';
import type { TAudioMetaInfoRegistry, TAudioResourceConfig } from '@/Engine/Audio/Models';

export const AudioMetaInfoRegistry = (): TAudioMetaInfoRegistry => AbstractSimpleRegistry<TAudioResourceConfig>(RegistryType.AudioMetaInfo);
