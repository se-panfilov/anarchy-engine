import type { TEntity } from '@/Engine/Abstract';
import type { TWithObject3d } from '@/Engine/Mixins';

import type { TModel3dConfig } from './TModel3dConfig';
import type { TModel3dConfigToParamsDependencies } from './TModel3dConfigToParamsDependencies';
import type { TModel3dParams } from './TModel3dParams';
import type { TWithModel3dEntities } from './TWithModel3dEntities';

export type TModel3d = Omit<TEntity<TWithModel3dEntities>, 'serialize'> &
  Readonly<{
    serialize: (dependencies: TModel3dConfigToParamsDependencies) => TModel3dConfig;
  }> &
  TWithObject3d &
  Readonly<{
    getParams: () => TModel3dParams;
  }>;
