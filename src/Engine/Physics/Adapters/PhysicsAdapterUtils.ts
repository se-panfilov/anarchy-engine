import type { TWithCoordsXYZ, TWithCoordsXYZW } from '@/Engine/Mixins';
import type { TVector3Wrapper, TVector4Wrapper } from '@/Engine/Vector';
import { Vector3Wrapper, Vector4Wrapper } from '@/Engine/Vector';

export function withCoordsToVector(position?: TWithCoordsXYZ, rotation?: TWithCoordsXYZW): Readonly<{ position: TVector3Wrapper; rotation: TVector4Wrapper }> {
  return {
    position: Vector3Wrapper(position || { x: 0, y: 0, z: 0 }),
    rotation: Vector4Wrapper(rotation || { x: 0, y: 0, z: 0, w: 1 })
  };
}
