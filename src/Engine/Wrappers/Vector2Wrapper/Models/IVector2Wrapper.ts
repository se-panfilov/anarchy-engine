import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { IWithCoordsXY } from '@/Engine/Mixins';

import type { IVector2 } from './IVector2';

export type IVector2Wrapper = IWrapper<IVector2> &
  Readonly<{
    getCoords: () => IWithCoordsXY;
  }>;
