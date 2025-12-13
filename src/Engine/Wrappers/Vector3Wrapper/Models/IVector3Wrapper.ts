import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { IWithCoordsXYZ } from '@/Engine/Mixins';

import type { IVector3 } from './IVector3';

export type IVector3Wrapper = IWrapper<IVector3> &
  Readonly<{
    getCoords: () => IWithCoordsXYZ;
  }>;
