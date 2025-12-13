import type { Quaternion, QuaternionLike, Vector3 } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

export type TKinematicTarget = Readonly<{
  positionThreshold: number;
  position: Vector3 | undefined;
  rotationThreshold: number;
  rotation: Quaternion | undefined;
}>;

export type TKinematicConfigTarget = Omit<TKinematicTarget, 'position' | 'rotation'> &
  Readonly<{
    position: Vector3Like | undefined;
    rotation: QuaternionLike | undefined;
  }>;
