import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { IWithCoordsXYZ } from '@/Engine/Mixins';

import type { IVector3 } from './IVector3';
import type { IVectorWithX } from './IVectorWithX';
import type { IVectorWithY } from './IVectorWithY';
import type { IVectorWithZ } from './IVectorWithZ';

export type IVector3Wrapper = IWrapper<IVector3> &
  Readonly<{
    getCoords: () => IWithCoordsXYZ;
  }> &
  IVectorWithX &
  IVectorWithY &
  IVectorWithZ;
