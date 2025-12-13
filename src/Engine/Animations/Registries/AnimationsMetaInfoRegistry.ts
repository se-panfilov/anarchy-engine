import { AbstractSimpleRegistry, RegistryType } from '@/Engine/Abstract';
import type { TAnimationsMetaInfoRegistry, TAnimationsResourceConfig } from '@/Engine/Animations/Models';

export const AnimationsMetaInfoRegistry = (): TAnimationsMetaInfoRegistry => AbstractSimpleRegistry<TAnimationsResourceConfig>(RegistryType.AnimationsMetaInfo);
