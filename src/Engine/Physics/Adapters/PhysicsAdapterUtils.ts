import type { Vector } from '@dimforge/rapier3d/math';
import { Vector4 } from 'three';
import { Vector3 } from 'three/src/math/Vector3';

export function withCoordsToVector(position?: Vector3 | Vector, rotation?: Vector4): Readonly<{ position: Vector3; rotation: Vector4 }> {
  return {
    position: new Vector3(position?.x || 0, position?.y || 0, position?.z || 0),
    rotation: new Vector4(rotation?.x || 0, rotation?.y || 0, rotation?.z || 0, rotation?.w || 1)
  };
}
