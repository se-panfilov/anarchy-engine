import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TLoop } from './TLoop';

export type TLoopRegistry = TProtectedRegistry<TAbstractEntityRegistry<TLoop>>;
