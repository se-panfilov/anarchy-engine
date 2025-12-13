import { AbstractSimpleRegistry, RegistryType } from '@/Abstract';
import type { TAnimationsMetaInfoRegistry, TAnimationsResourceConfig } from '@/Animations/Models';

export function AnimationsMetaInfoRegistry(): TAnimationsMetaInfoRegistry {
  return AbstractSimpleRegistry<TAnimationsResourceConfig>(RegistryType.AnimationsMetaInfo);
}
