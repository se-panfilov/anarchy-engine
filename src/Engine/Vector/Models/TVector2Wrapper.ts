import type { TWrapper } from '@/Engine/Abstract';
import type { TWithCoordsXY } from '@/Engine/Mixins';

import type { TVector2 } from './TVector2';
import type { TVectorWithX } from './TVectorWithX';
import type { TVectorWithY } from './TVectorWithY';

export type TVector2Wrapper = TWrapper<TVector2> &
  Readonly<{
    getCoords: () => TWithCoordsXY;
  }> &
  TVectorWithX &
  TVectorWithY;
