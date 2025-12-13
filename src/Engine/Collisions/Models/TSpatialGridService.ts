import type RBush from 'rbush';
import type { Object3D, Scene } from 'three';

import type { TBoundingBox } from './TBoundingBox';

export type TSpatialGridService = Readonly<{
  addObjectToGrid: (object: Object3D) => void;
  removeObjectFromGrid: (object: Object3D) => void;
  updateObjectInGrid: (object: Object3D) => void;
  visualizeRBush: (grid: RBush<TBoundingBox>, scene: Scene) => void;
}>;
