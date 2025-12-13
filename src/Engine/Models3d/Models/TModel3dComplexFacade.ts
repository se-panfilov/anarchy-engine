import type { TFacade } from '@/Engine/Abstract';
import type { TOptional } from '@/Engine/Utils';

import type { TModel3dComplexPack } from './TModel3dComplexPack';
import type { TWithModel3dComplexFacadeEntities } from './TWithModel3dComplexFacadeEntities';

export type TModel3dComplexFacade = TFacade<TWithModel3dComplexFacadeEntities> &
  Readonly<{
    _clone: (overrides?: TOptional<TModel3dComplexPack>) => TModel3dComplexFacade;
    getPack: () => TModel3dComplexPack;
  }>;
