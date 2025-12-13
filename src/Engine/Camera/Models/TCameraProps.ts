import type { Vector3 } from 'three/src/math/Vector3';

import type { TActive, TWithName } from '@/Engine/Mixins';

export type TCameraProps = Readonly<{
  fov?: number;
  near?: number;
  far?: number;
  lookAt?: Vector3;
}> &
  TWithName &
  TActive;
