import type { TMaterialRegistry } from '@/Engine/Material';

import type { TModel3dResourceAsyncRegistry } from './TModel3dResourceAsyncRegistry';

export type TModel3dConfigToParamsDependencies = Readonly<{
  materialRegistry: TMaterialRegistry;
  model3dResourceAsyncRegistry: TModel3dResourceAsyncRegistry;
}>;
