import type { TAnimationsService } from '@/Engine/Animations/Models';

import type { TModel3dToModel3dFacadeConnectionRegistry } from './TModel3dToModel3dFacadeConnectionRegistry';

export type TModel3dFacadeDependencies = Readonly<{
  animationsService: TAnimationsService;
  model3dToModel3dFacadeConnectionRegistry: TModel3dToModel3dFacadeConnectionRegistry;
}>;
