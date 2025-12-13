import type { TAnimationsService } from '@Engine/Animations';
import type { TMaterialService } from '@Engine/Material';

import type { TModel3dRawToModel3dConnectionRegistry } from './TModel3dRawToModel3dConnectionRegistry';

export type TModels3dServiceDependencies = Readonly<{
  animationsService: TAnimationsService;
  materialService: TMaterialService;
  model3dRawToModel3dConnectionRegistry: TModel3dRawToModel3dConnectionRegistry;
}>;
