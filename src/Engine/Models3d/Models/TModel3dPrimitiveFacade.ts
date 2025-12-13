import type { TFacade } from '@/Engine/Abstract';
import type { TOptional } from '@/Engine/Utils';

import type { TModel3dPrimitivePack } from './TModel3dPrimitivePack';
import type { TWithModel3dPrimitiveFacadeEntities } from './TWithModel3dPrimitiveFacadeEntities';

export type TModel3dPrimitiveFacade = TFacade<TWithModel3dPrimitiveFacadeEntities> &
  Readonly<{
    // TODO 9.0.0. RESOURCES: Maybe no need in overrides, just create a new instance of a resource
    _clone: (overrides?: TOptional<TModel3dPrimitivePack>) => TModel3dPrimitiveFacade;
    getPack: () => TModel3dPrimitivePack;
  }>;
