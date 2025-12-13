import type { TWrapper } from '@/Engine/Abstract';
import type { TWithCoordsXYZW } from '@/Engine/Mixins';

import type { TVector4 } from './TVector4';
import type { TVectorWithW } from './TVectorWithW';
import type { TVectorWithX } from './TVectorWithX';
import type { TVectorWithY } from './TVectorWithY';
import type { TVectorWithZ } from './TVectorWithZ';

export type TVector4Wrapper = TWrapper<TVector4> &
  Readonly<{
    getCoords: () => TWithCoordsXYZW;
  }> &
  TVectorWithX &
  TVectorWithY &
  TVectorWithZ &
  TVectorWithW;
