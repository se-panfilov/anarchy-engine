import type { IWrapper } from '@/Engine/Abstract';
import type { IWithCoordsXY } from '@/Engine/Mixins';

import type { IVector2 } from './IVector2';
import type { IVectorWithX } from './IVectorWithX';
import type { IVectorWithY } from './IVectorWithY';

export type IVector2Wrapper = IWrapper<IVector2> &
  Readonly<{
    getCoords: () => IWithCoordsXY;
  }> &
  IVectorWithX &
  IVectorWithY;
