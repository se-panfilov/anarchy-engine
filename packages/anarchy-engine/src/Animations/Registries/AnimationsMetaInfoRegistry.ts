import { AbstractSimpleRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TAnimationsMetaInfoRegistry, TAnimationsResourceConfig } from '@hellpig/anarchy-engine/Animations/Models';

export function AnimationsMetaInfoRegistry(): TAnimationsMetaInfoRegistry {
  return AbstractSimpleRegistry<TAnimationsResourceConfig>(RegistryType.AnimationsMetaInfo);
}
