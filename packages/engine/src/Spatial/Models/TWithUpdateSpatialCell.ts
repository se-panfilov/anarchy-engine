import type { TReadonlyVector3 } from '@/ThreeLib';

export type TWithUpdateSpatialCell = Readonly<{ updateSpatialCells: (newPosition: TReadonlyVector3) => void | never }>;
