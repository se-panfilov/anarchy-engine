import type { TFacade } from '@/Engine/Abstract';
import type { TWithObject3d } from '@/Engine/Mixins';
import type { TOptional } from '@/Engine/Utils';

import type { TModel3dParams } from './TModel3dParams';
import type { TWithModel3dFacadeEntities } from './TWithModel3dFacadeEntities';

export type TModel3dFacade = TFacade<TWithModel3dFacadeEntities> &
  TWithObject3d &
  Readonly<{
    _clone: (overrides?: TOptional<TModel3dParams>) => TModel3dFacade;
    getParams: () => TModel3dParams;
  }>;
