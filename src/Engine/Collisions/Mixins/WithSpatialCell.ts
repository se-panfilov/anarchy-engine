import type { TSpatialCell, TWithSpatialCell } from '@/Engine/Collisions/Models';

export function withSpatialCell(): TWithSpatialCell {
  let cell: TSpatialCell | undefined;
  const getSpatialCell = (): TSpatialCell | undefined => cell;
  const setSpatialCell = (newCell: TSpatialCell | undefined): void => void (cell = newCell);
  const resetSpatialCell = (): void => void (cell = undefined);

  return {
    getSpatialCell,
    setSpatialCell,
    resetSpatialCell
  };
}
