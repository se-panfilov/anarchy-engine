import type { Vector3 } from 'three/src/math/Vector3';

import type { TAppCanvas } from '@/Engine/App';
import type { TCameraWrapper } from '@/Engine/Camera';
import type { TActive, TWithNameOptional, TWithTags } from '@/Engine/Mixins';

export type TOrbitControlsParams = Readonly<{
  enabled?: boolean;
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
  camera: TCameraWrapper;
  canvas: TAppCanvas;
  target?: Vector3;
  cursor?: Vector3;
}> &
  TWithNameOptional &
  TActive &
  TWithTags;
