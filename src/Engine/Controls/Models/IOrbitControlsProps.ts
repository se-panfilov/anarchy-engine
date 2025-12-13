import type { IActive, IWithName } from '@/Engine/Mixins';
import type { IVector3 } from '@/Engine/Vector';

export type IOrbitControlsProps = Readonly<{
  enabled?: boolean;
  target?: IVector3;
  cursor?: IVector3;
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
  IWithName &
  IActive;
