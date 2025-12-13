import type { TFacade } from '@/Engine/Abstract';

import type { TWithModel3dFacadeEntities } from './TWithModel3dFacadeEntities';

export type TModel3dFacade = TFacade<TWithModel3dFacadeEntities> &
  Readonly<{
    _clone: () => TModel3dFacade;
  }>;
