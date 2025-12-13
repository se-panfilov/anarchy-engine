import type { TActor } from '@Anarchy/Engine/Actor';
import type { TSpatialCell, TSpatialCellWrapper, TSpatialGridWrapper, TWithUpdateSpatialCell } from '@Anarchy/Engine/Spatial/Models';
import type { TReadonlyVector3 } from '@Anarchy/Engine/ThreeLib';
import { isDefined, isNotDefined } from '@Shared/Utils';

export function withUpdateSpatialCell(): TWithUpdateSpatialCell {
  let prevCells: ReadonlyArray<Pick<TSpatialCell, 'maxX' | 'maxY' | 'minX' | 'minY'>> = [];

  function updateSpatialCells(this: TActor, newPosition: TReadonlyVector3): void | never {
    const grid: TSpatialGridWrapper | undefined = this.spatial.getGrid();
    if (isNotDefined(grid)) throw new Error(`Grid is not defined for Actor name: "${this.name}", id: "${this.id}"`);
    const cells: ReadonlyArray<TSpatialCellWrapper> = this.spatial.getSpatialCells();

    //first run
    if (prevCells.length === 0) {
      prevCells = cells.map(({ maxX, maxY, minX, minY }: TSpatialCellWrapper): Pick<TSpatialCell, 'maxX' | 'maxY' | 'minX' | 'minY'> => ({ maxX, maxY, minX, minY }));
      return;
    }

    const isOutside = ({ minX, minY, maxX, maxY }: Pick<TSpatialCell, 'maxX' | 'maxY' | 'minX' | 'minY'>, newPosition: TReadonlyVector3): boolean => {
      return newPosition.x < minX || newPosition.x > maxX || newPosition.z < minY || newPosition.z > maxY;
    };

    // eslint-disable-next-line functional/no-loop-statements
    for (let index: number = 0; index < cells.length; index++) {
      if (isDefined(prevCells[index]) && isOutside(prevCells[index], newPosition)) {
        if (isNotDefined(grid)) throw new Error(`Cannot update actor's (id: "${this.id}") spatial grid's cell: grid is not defined`);
        grid.updateActorCell(this);
      }
    }

    prevCells = cells.map(({ maxX, maxY, minX, minY }: TSpatialCellWrapper) => ({ maxX, maxY, minX, minY }));
  }

  return {
    updateSpatialCells
  };
}
