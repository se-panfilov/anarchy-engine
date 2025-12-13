import type { TSpatialCell } from '@/Engine/Collisions/Models';

export type TWithSpatialCell = Readonly<{
  getSpatialCell: () => TSpatialCell | undefined;
  setSpatialCell: (cell: TSpatialCell | undefined) => void;
  resetSpatialCell: () => void;
}>;
