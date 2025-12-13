import type { TFacade } from '@/Engine/Abstract';
import type { TOptional } from '@/Engine/Utils';

import type { TModel3dPack } from './TModel3dPack';
import type { TWithModel3dFacadeEntities } from './TWithModel3dFacadeEntities';

export type TModel3dFacade = TFacade<TWithModel3dFacadeEntities> &
  Readonly<{
    _clone: (overrides?: TOptional<TModel3dPack>) => TModel3dFacade;
  }>;
