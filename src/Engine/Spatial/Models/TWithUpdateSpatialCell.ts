import type { TReadonlyVector3 } from '@/Engine/ThreeLib';

export type TWithUpdateSpatialCell = Readonly<{ updateSpatialCells: (newPosition: TReadonlyVector3) => void | never }>;
