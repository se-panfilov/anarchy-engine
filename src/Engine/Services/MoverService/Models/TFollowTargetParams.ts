import type { Vector3 } from 'three';

import type { TWithCoordsXYZ, TWithPosition3d } from '@/Engine/Mixins';
import type { TWriteable } from '@/Engine/Utils';

export type TFollowTargetParams = Readonly<{
  obj: TWriteable<TWithCoordsXYZ>;
  target: TWithPosition3d;
  offset?: Partial<Vector3>;
}>;
