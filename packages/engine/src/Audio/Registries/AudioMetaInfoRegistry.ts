import { AbstractSimpleRegistry, RegistryType } from '@Engine/Abstract';
import type { TAudioMetaInfoRegistry, TAudioResourceConfig } from '@Engine/Audio/Models';

export function AudioMetaInfoRegistry(): TAudioMetaInfoRegistry {
  return AbstractSimpleRegistry<TAudioResourceConfig>(RegistryType.AudioMetaInfo);
}
