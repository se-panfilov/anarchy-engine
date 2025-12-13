import type { AnimationClip } from 'three';

import { AbstractSimpleAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TAnimationsAsyncRegistry } from '@/Engine/Animations/Models';

export const AnimationsAsyncRegistry = (): TAnimationsAsyncRegistry => RegistryFacade(AbstractSimpleAsyncRegistry<Record<string, AnimationClip>>(RegistryType.Model3dAnimations));
