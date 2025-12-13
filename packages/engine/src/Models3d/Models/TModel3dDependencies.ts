import type { TAnimationsService } from '@Engine/Animations/Models';

import type { TModel3dRawToModel3dConnectionRegistry } from './TModel3dRawToModel3dConnectionRegistry';

export type TModel3dDependencies = Readonly<{
  animationsService: TAnimationsService;
  model3dRawToModel3dConnectionRegistry: TModel3dRawToModel3dConnectionRegistry;
}>;
