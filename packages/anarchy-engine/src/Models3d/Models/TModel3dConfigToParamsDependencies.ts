import type { TAnimationsResourceAsyncRegistry } from '@hellpig/anarchy-engine/Animations';
import type { TMaterialRegistry } from '@hellpig/anarchy-engine/Material';

import type { TModels3dResourceAsyncRegistry } from './TModels3dResourceAsyncRegistry';

export type TModel3dConfigToParamsDependencies = Readonly<{
  materialRegistry: TMaterialRegistry;
  model3dResourceAsyncRegistry: TModels3dResourceAsyncRegistry;
  animationsResourceAsyncRegistry: TAnimationsResourceAsyncRegistry;
}>;
