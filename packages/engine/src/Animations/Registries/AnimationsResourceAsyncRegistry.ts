import { AbstractResourceAsyncRegistry, RegistryType } from '@/Abstract';
import type { TAnimations, TAnimationsResourceAsyncRegistry } from '@/Animations/Models';

export function AnimationsResourceAsyncRegistry(): TAnimationsResourceAsyncRegistry {
  return AbstractResourceAsyncRegistry<TAnimations>(RegistryType.Animations);
}
