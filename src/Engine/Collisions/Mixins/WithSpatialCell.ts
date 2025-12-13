import type { TWithSpatialCell } from '@/Engine/Collisions/Models';

export function withSpatialCell(): TWithSpatialCell {
  let cell: number = -1;

  function getCell(): number {
    return cell;
  }

  function setCell(newCell: number): void {
    cell = newCell;
  }

  return {
    getCell,
    setCell
  };
}
