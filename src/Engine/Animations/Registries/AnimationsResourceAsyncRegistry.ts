import { AbstractSimpleAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TAnimations, TAnimationsResourceAsyncRegistry } from '@/Engine/Animations/Models';

export const AnimationsResourceAsyncRegistry = (): TAnimationsResourceAsyncRegistry => RegistryFacade(AbstractSimpleAsyncRegistry<TAnimations>(RegistryType.Animations));
