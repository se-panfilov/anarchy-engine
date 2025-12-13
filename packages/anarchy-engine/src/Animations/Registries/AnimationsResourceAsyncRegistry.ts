import { AbstractResourceAsyncRegistry, RegistryType } from '@Engine/Abstract';
import type { TAnimations, TAnimationsResourceAsyncRegistry } from '@Engine/Animations/Models';

export function AnimationsResourceAsyncRegistry(): TAnimationsResourceAsyncRegistry {
  return AbstractResourceAsyncRegistry<TAnimations>(RegistryType.Animations);
}
