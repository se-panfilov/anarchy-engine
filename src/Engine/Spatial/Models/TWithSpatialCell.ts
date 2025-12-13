import type { TSpatialCell } from '@/Engine/Spatial/Models';

export type TWithSpatialCell = Readonly<{
  getSpatialCell: () => TSpatialCell | undefined;
  setSpatialCell: (cell: TSpatialCell | undefined) => void;
  resetSpatialCell: () => void;
}>;
