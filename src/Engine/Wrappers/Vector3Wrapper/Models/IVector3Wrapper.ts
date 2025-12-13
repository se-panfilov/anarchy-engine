import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { IWithCoordsXYZ } from '@/Engine/Mixins';
import type { IVectorWithX, IVectorWithY } from '@/Engine/Wrappers/Vector2Wrapper';

import type { IVector3 } from './IVector3';
import type { IVectorWithZ } from './IVectorWithZ';

export type IVector3Wrapper = IWrapper<IVector3> &
  Readonly<{
    getCoords: () => IWithCoordsXYZ;
  }> &
  IVectorWithX &
  IVectorWithY &
  IVectorWithZ;
