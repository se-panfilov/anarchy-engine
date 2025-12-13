import type { Vector3 } from 'three';

export type TWithUpdateSpatialCell = Readonly<{ updateSpatialCells: (newPosition: Vector3) => void | never }>;
