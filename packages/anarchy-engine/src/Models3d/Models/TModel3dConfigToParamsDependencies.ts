import type { TAnimationsResourceAsyncRegistry } from '@Anarchy/Engine/Animations';
import type { TMaterialRegistry } from '@Anarchy/Engine/Material';

import type { TModels3dResourceAsyncRegistry } from './TModels3dResourceAsyncRegistry';

export type TModel3dConfigToParamsDependencies = Readonly<{
  materialRegistry: TMaterialRegistry;
  model3dResourceAsyncRegistry: TModels3dResourceAsyncRegistry;
  animationsResourceAsyncRegistry: TAnimationsResourceAsyncRegistry;
}>;
