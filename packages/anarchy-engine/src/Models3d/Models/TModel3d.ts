import type { TEntity } from '@hellpig/anarchy-engine/Abstract';
import type { TWithObject3d } from '@hellpig/anarchy-engine/Mixins';

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
