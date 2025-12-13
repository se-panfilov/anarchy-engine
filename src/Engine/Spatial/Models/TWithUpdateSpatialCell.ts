import type { Vector3 } from 'three';

import type { TSpatialGridWrapper } from './TSpatialGridWrapper';

export type TWithUpdateSpatialCell = Readonly<{ updateSpatialCell: (newPosition: Vector3, gridW: TSpatialGridWrapper | undefined) => void | never }>;
