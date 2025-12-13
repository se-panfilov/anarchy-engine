import type { EulerOrder } from 'three';

import type { IWithCoordsXYZ } from '@/Engine/Mixins';

export type IEuler3dConfig = Partial<IWithCoordsXYZ> &
  Readonly<{
    order?: EulerOrder;
  }>;
