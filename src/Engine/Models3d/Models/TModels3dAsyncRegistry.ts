import type { TAbstractAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TModel3dFacade } from './TModel3dFacade';

export type TModels3dAsyncRegistry = TProtectedRegistry<TAbstractAsyncRegistry<TModel3dFacade>>;
