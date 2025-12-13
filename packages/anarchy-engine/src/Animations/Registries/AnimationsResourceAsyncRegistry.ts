import { AbstractResourceAsyncRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TAnimations, TAnimationsResourceAsyncRegistry } from '@Anarchy/Engine/Animations/Models';

export function AnimationsResourceAsyncRegistry(): TAnimationsResourceAsyncRegistry {
  return AbstractResourceAsyncRegistry<TAnimations>(RegistryType.Animations);
}
