import { AbstractSimpleRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TAudioMetaInfoRegistry, TAudioResourceConfig } from '@hellpig/anarchy-engine/Audio/Models';

export function AudioMetaInfoRegistry(): TAudioMetaInfoRegistry {
  return AbstractSimpleRegistry<TAudioResourceConfig>(RegistryType.AudioMetaInfo);
}
