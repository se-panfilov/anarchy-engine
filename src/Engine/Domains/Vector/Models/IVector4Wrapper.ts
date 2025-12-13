import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { IWithCoordsXYZW } from '@/Engine/Mixins';

import type { IVector4 } from './IVector4';
import type { IVectorWithW } from './IVectorWithW';
import type { IVectorWithX } from './IVectorWithX';
import type { IVectorWithY } from './IVectorWithY';
import type { IVectorWithZ } from './IVectorWithZ';

export type IVector4Wrapper = IWrapper<IVector4> &
  Readonly<{
    getCoords: () => IWithCoordsXYZW;
  }> &
  IVectorWithX &
  IVectorWithY &
  IVectorWithZ &
  IVectorWithW;
