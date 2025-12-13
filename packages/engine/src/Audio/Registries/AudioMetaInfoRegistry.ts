import { AbstractSimpleRegistry, RegistryType } from '@/Abstract';
import type { TAudioMetaInfoRegistry, TAudioResourceConfig } from '@/Audio/Models';

export function AudioMetaInfoRegistry(): TAudioMetaInfoRegistry {
  return AbstractSimpleRegistry<TAudioResourceConfig>(RegistryType.AudioMetaInfo);
}
