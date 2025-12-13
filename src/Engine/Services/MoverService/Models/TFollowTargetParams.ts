import type { Vector3 } from 'three';

import type { TWithConnectedTransformAgent, TWithTransformDrive } from '@/Engine/TransformDrive';

export type TFollowTargetParams = Readonly<{
  obj: TWithTransformDrive<TWithConnectedTransformAgent>;
  target: TWithTransformDrive<any>;
  offset?: Partial<Vector3>;
}>;
