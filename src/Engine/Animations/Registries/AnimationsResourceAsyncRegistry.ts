import { AbstractSimpleAsyncRegistry, RegistryType } from '@/Engine/Abstract';
import type { TAnimations, TAnimationsResourceAsyncRegistry } from '@/Engine/Animations/Models';

export const AnimationsResourceAsyncRegistry = (): TAnimationsResourceAsyncRegistry => AbstractSimpleAsyncRegistry<TAnimations>(RegistryType.Animations);
