import type { Vector3 } from 'three';

export type TOrbitControlsParamsOptions = Readonly<{
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  cursor?: Vector3;
  dampingFactor?: number;
  enableDamping?: boolean;
  enablePan?: boolean;
  enableRotate?: boolean;
  enableZoom?: boolean;
  keyPanSpeed?: number;
  maxAzimuthAngle?: number;
  maxDistance?: number;
  maxPolarAngle?: number;
  maxTargetRadius?: number;
  maxZoom?: number;
  minAzimuthAngle?: number;
  minDistance?: number;
  minPolarAngle?: number;
  minTargetRadius?: number;
  minZoom?: number;
  panSpeed?: number;
  rotateSpeed?: number;
  screenSpacePanning?: boolean;
  zoomSpeed?: number;
  zoomToCursor?: boolean;
}>;
