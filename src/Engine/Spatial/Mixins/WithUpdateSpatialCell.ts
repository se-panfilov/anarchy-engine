import type { Vector3 } from 'three';

import type { TActorWrapper } from '@/Engine/Actor';
import type { TSpatialCell, TSpatialCellWrapper, TSpatialGridWrapper, TWithUpdateSpatialCell } from '@/Engine/Spatial/Models';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function withUpdateSpatialCell(): TWithUpdateSpatialCell {
  let prevCells: ReadonlyArray<Pick<TSpatialCell, 'maxX' | 'maxY' | 'minX' | 'minY'>> = [];

  function updateSpatialCells(this: TActorWrapper, newPosition: Vector3): void | never {
    const grid: TSpatialGridWrapper | undefined = this.spatial.getGrid();
    const cells: ReadonlyArray<TSpatialCellWrapper> = this.spatial.getSpatialCells();

    //first run
    if (prevCells.length === 0) {
      prevCells = cells.map(({ maxX, maxY, minX, minY }): Pick<TSpatialCell, 'maxX' | 'maxY' | 'minX' | 'minY'> => ({ maxX, maxY, minX, minY }));
      return;
    }

    const isOutside = ({ minX, minY, maxX, maxY }: Pick<TSpatialCell, 'maxX' | 'maxY' | 'minX' | 'minY'>, newPosition: Vector3): boolean => {
      return newPosition.x < minX || newPosition.x > maxX || newPosition.z < minY || newPosition.z > maxY;
    };

    // eslint-disable-next-line functional/no-loop-statements
    for (let index: number = 0; index < cells.length; index++) {
      if (isDefined(prevCells[index]) && isOutside(prevCells[index], newPosition)) {
        if (isNotDefined(grid)) throw new Error(`Cannot update actor's (id: "${this.id}") spatial grid's cell: grid is not defined`);
        grid.updateActorCell(this);
      }
    }

    prevCells = cells.map(({ maxX, maxY, minX, minY }) => ({ maxX, maxY, minX, minY }));
  }

  return {
    updateSpatialCells
  };
}
