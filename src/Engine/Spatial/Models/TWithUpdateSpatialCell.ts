import type { Vector3 } from 'three';

export type TWithUpdateSpatialCell = Readonly<{ updateSpatialCell: (newPosition: Vector3) => void | never }>;
