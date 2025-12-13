import { AbstractSimpleRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TAudioMetaInfoRegistry, TAudioResourceConfig } from '@Anarchy/Engine/Audio/Models';

export function AudioMetaInfoRegistry(): TAudioMetaInfoRegistry {
  return AbstractSimpleRegistry<TAudioResourceConfig>(RegistryType.AudioMetaInfo);
}
