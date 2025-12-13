import type { Vector3 } from 'three';

import type { TActive, TWithName, TWithTags } from '@/Engine/Mixins';
import type { TSpaceCanvas } from '@/Engine/Space';

import type { TBaseControlsParams } from './TBaseControlsParams';

export type TOrbitControlsParams = TBaseControlsParams &
  Readonly<{
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
    canvas: TSpaceCanvas;
    target?: Vector3;
    cursor?: Vector3;
  }> &
  TWithName &
  TActive &
  TWithTags;
