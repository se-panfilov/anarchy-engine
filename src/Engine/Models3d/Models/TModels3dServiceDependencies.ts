import type { TAnimationsService } from '@/Engine/Animations';
import type { TMaterialService } from '@/Engine/Material';

import type { TModel3dToModel3dFacadeConnectionRegistry } from './TModel3dToModel3dFacadeConnectionRegistry';

export type TModels3dServiceDependencies = Readonly<{
  animationsService: TAnimationsService;
  materialService: TMaterialService;
  model3dToModel3dFacadeConnectionRegistry: TModel3dToModel3dFacadeConnectionRegistry;
}>;
