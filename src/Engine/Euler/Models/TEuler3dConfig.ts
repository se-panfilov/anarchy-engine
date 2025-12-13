import type { EulerOrder } from 'three';

import type { TWithCoordsXYZ } from '@/Engine/Mixins';

export type TEuler3dConfig = Partial<TWithCoordsXYZ> &
  Readonly<{
    order?: EulerOrder;
  }>;
