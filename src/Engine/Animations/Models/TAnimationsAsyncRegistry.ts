import type { AnimationClip } from 'three';

import type { TAbstractSimpleAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract';

export type TAnimationsAsyncRegistry = TProtectedRegistry<TAbstractSimpleAsyncRegistry<Record<string, AnimationClip>>>;
