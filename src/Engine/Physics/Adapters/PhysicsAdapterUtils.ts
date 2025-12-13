import type { Vector3 } from 'three/src/math/Vector3';

export function withCoordsToVector(position?: Vector3, rotation?: TWithCoordsXYZW): Readonly<{ position: Vector3; rotation: TVector4Wrapper }> {
  return {
    position: Vector3Wrapper(position || { x: 0, y: 0, z: 0 }),
    rotation: Vector4Wrapper(rotation || { x: 0, y: 0, z: 0, w: 1 })
  };
}
