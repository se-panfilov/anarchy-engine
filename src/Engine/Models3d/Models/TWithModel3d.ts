import type { TMovable3dXYZ, TRotatable, TScalable } from '@/Engine/Mixins';

import type { TModel3d } from './TModel3d';

export type TWithModel3d = Readonly<{
  // TODO 8.0.0. MODELS: What a hell model3d.model3d is? Remove that duplication or rename it
  model3d: Readonly<{
    model3d: TModel3d;
  }> &
    TMovable3dXYZ &
    TRotatable &
    TScalable;
}>;
