import type { TMovable3dXYZ, TRotatable, TScalable } from '@/Engine/Mixins';

import type { TModel3dFacade } from './TModel3dFacade';

export type TWithModel3dFacade = Readonly<{
  model3d: Readonly<{
    facade: TModel3dFacade;
  }> &
    TMovable3dXYZ &
    TRotatable &
    TScalable;
}>;
