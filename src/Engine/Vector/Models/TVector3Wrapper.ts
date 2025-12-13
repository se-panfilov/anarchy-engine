import type { TWrapper } from '@/Engine/Abstract';
import type { IWithCoordsXYZ } from '@/Engine/Mixins';

import type { TVector3 } from './TVector3';
import type { TVectorWithX } from './TVectorWithX';
import type { TVectorWithY } from './TVectorWithY';
import type { TVectorWithZ } from './TVectorWithZ';

export type TVector3Wrapper = TWrapper<TVector3> &
  Readonly<{
    getCoords: () => IWithCoordsXYZ;
  }> &
  TVectorWithX &
  TVectorWithY &
  TVectorWithZ;
