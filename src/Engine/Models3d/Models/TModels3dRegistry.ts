import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TModel3d } from './TModel3d';

export type TModels3dRegistry = TProtectedRegistry<TAbstractEntityRegistry<TModel3d>>;
