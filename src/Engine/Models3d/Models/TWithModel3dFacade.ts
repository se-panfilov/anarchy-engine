import type { TMovable3dXYZ, TRotatable, TScalable } from '@/Engine/Mixins';

import type { TModel3d } from './TModel3d';

export type TWithModel3dFacade = Readonly<{
  model3d: Readonly<{
    facade: TModel3d;
  }> &
    TMovable3dXYZ &
    TRotatable &
    TScalable;
}>;
