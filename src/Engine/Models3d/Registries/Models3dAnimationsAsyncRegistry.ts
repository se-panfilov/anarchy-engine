import type { AnimationClip } from 'three';

import { AbstractSimpleAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TModels3dAnimationsAsyncRegistry } from '@/Engine/Models3d/Models';

export const Models3dAnimationsAsyncRegistry = (): TModels3dAnimationsAsyncRegistry => RegistryFacade(AbstractSimpleAsyncRegistry<Record<string, AnimationClip>>(RegistryType.Model3dAnimations));
