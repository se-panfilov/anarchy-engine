import type { Vector3 } from 'three';
import type { CameraTag } from '@Engine/Constants';

export type ICameraParams = Readonly<{
  fov?: number;
  near?: number;
  far?: number;
  lookAt: Vector3;
  position: Vector3;
  tag: CameraTag;
}>;
