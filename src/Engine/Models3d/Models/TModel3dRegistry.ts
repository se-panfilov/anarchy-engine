import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TModel3dFacade } from './TModel3dFacade';

export type TModel3dRegistry = TProtectedRegistry<TAbstractEntityRegistry<TModel3dFacade>>;
