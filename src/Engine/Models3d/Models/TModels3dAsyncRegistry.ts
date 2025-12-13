import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TModel3dFacade } from './TModel3dFacade';

export type TModels3dAsyncRegistry = TProtectedRegistry<TAbstractEntityRegistry<TModel3dFacade>>;
