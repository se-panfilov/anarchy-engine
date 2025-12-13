import { AbstractSimpleRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TAnimationsMetaInfoRegistry, TAnimationsResourceConfig } from '@Anarchy/Engine/Animations/Models';

export function AnimationsMetaInfoRegistry(): TAnimationsMetaInfoRegistry {
  return AbstractSimpleRegistry<TAnimationsResourceConfig>(RegistryType.AnimationsMetaInfo);
}
