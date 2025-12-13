import type { TFacade } from '@/Engine/Abstract';
import type { TOptional } from '@/Engine/Utils';

import type { TModel3dPack } from './TModel3dPack';
import type { TWithModel3dFacadeEntities } from './TWithModel3dFacadeEntities';

export type TModel3dFacade = TFacade<TWithModel3dFacadeEntities> &
  Readonly<{
    // TODO 9.0.0. RESOURCES: Maybe no need in overrides, just create a new instance of a resource
    _clone: (overrides?: TOptional<TModel3dPack>) => TModel3dFacade;
    getPack: () => TModel3dPack;
  }>;
