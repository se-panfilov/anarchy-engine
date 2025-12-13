import type { Quaternion } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import type { TWithCoordsXYZ } from '@/Engine/Mixins';

import type { TEuler } from './TEuler';
import type { TEulerWithX } from './TEulerWithX';
import type { TEulerWithY } from './TEulerWithY';
import type { TEulerWithZ } from './TEulerWithZ';

export type TEulerWrapper = TWrapper<TEuler> &
  Readonly<{
    getCoords: () => TWithCoordsXYZ;
    toQuaternion: () => Quaternion;
  }> &
  TEulerWithX &
  TEulerWithY &
  TEulerWithZ;
