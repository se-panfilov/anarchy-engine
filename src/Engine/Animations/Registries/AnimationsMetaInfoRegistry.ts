import { AbstractSimpleRegistry, RegistryType } from '@/Engine/Abstract';
import type { TAnimationsMetaInfoRegistry, TAnimationsResourceConfig } from '@/Engine/Animations/Models';

export function AnimationsMetaInfoRegistry(): TAnimationsMetaInfoRegistry {
  return AbstractSimpleRegistry<TAnimationsResourceConfig>(RegistryType.AnimationsMetaInfo);
}
