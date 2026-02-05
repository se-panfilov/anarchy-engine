import { AbstractResourceAsyncRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TAnimations, TAnimationsResourceAsyncRegistry } from '@hellpig/anarchy-engine/Animations/Models';

export function AnimationsResourceAsyncRegistry(): TAnimationsResourceAsyncRegistry {
  return AbstractResourceAsyncRegistry<TAnimations>(RegistryType.Animations);
}
