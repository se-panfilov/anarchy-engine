import type { Vector3 } from 'three/src/math/Vector3';

import type { TActive, TWithName } from '@/Engine/Mixins';

export type TOrbitControlsProps = Readonly<{
  enabled?: boolean;
  target?: Vector3;
  cursor?: Vector3;
  minDistance?: number;
  maxDistance?: number;
  minZoom?: number;
  maxZoom?: number;
  minTargetRadius?: number;
  maxTargetRadius?: number;
  minPolarAngle?: number;
  maxPolarAngle?: number;
  minAzimuthAngle?: number;
  maxAzimuthAngle?: number;
  enableDamping?: boolean;
  dampingFactor?: number;
  enableZoom?: boolean;
  zoomSpeed?: number;
  zoomToCursor?: boolean;
  enableRotate?: boolean;
  rotateSpeed?: number;
  enablePan?: boolean;
  panSpeed?: number;
  screenSpacePanning?: boolean;
  keyPanSpeed?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}> &
  TWithName &
  TActive;
