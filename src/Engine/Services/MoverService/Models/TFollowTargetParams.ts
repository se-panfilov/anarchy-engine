import type { Vector3 } from 'three';

import type { TWithCoordsXYZ } from '@/Engine/Mixins';
import type { TWriteable } from '@/Engine/Utils';

export type TFollowTargetParams = Readonly<{
  obj: TWriteable<TWithCoordsXYZ>;
  target: TWithCoordsXYZ;
  offset?: Partial<Vector3>;
}>;
