import type { Vector3 } from 'three';

import type { TMovable3dXYZ, TWithPosition3d } from '@/Engine/Mixins';

export type TFollowTargetParams = Readonly<{
  obj: TMovable3dXYZ;
  target: TWithPosition3d;
  offset?: Partial<Vector3>;
}>;
