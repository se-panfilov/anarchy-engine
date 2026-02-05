import type { TReadonlyVector3 } from '@hellpig/anarchy-engine/ThreeLib';

export type TWithUpdateSpatialCell = Readonly<{ updateSpatialCells: (newPosition: TReadonlyVector3) => void | never }>;
