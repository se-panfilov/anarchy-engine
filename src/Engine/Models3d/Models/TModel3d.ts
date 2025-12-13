import type { TEntity } from '@/Engine/Abstract';
import type { TWithObject3d } from '@/Engine/Mixins';
import type { TOptional } from '@/Engine/Utils';

import type { TModel3dParams } from './TModel3dParams';
import type { TWithModel3dEntities } from './TWithModel3dEntities';

export type TModel3d = TEntity<TWithModel3dEntities> &
  TWithObject3d &
  Readonly<{
    _clone: (overrides?: TOptional<TModel3dParams>) => TModel3d;
    getParams: () => TModel3dParams;
  }>;
