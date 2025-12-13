import type { Vector } from '@dimforge/rapier3d/math';
import type { Vector4 } from 'three';
import { Quaternion } from 'three';
import { Vector3 } from 'three/src/math/Vector3';

export function withCoordsToVector(position?: Vector3 | Vector, rotation?: Vector4): Readonly<{ position: Vector3; rotation: Quaternion }> {
  return {
    position: new Vector3(position?.x || 0, position?.y || 0, position?.z || 0),
    rotation: new Quaternion(rotation?.x || 0, rotation?.y || 0, rotation?.z || 0, rotation?.w || 1)
  };
}
