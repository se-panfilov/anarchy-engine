import type { Vector3 } from 'three';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TSpatialCell, TSpatialGridWrapper, TWithUpdateSpatialCell } from '@/Engine/Spatial/Models';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function withUpdateSpatialCell(): TWithUpdateSpatialCell {
  let prev: Pick<TSpatialCell, 'maxX' | 'maxY' | 'minX' | 'minY'> = {} as Pick<TSpatialCell, 'maxX' | 'maxY' | 'minX' | 'minY'>;

  function updateSpatialCell(this: TActorWrapperAsync, newPosition: Vector3, gridW: TSpatialGridWrapper | undefined): void | never {
    if (isNotDefined(gridW)) throw new Error(`Cannot update actor's (id: "${this.id}") spatial grid's cell: grid is not defined`);

    //first run
    if (isNotDefined(prev.minX)) {
      const cell: TSpatialCell | undefined = this.spatial.getSpatialCell();
      if (isNotDefined(cell)) throw new Error(`Cannot update actor's (id: "${this.id}") spatial grid's cell: actor is not in the grid`);
      prev = {
        minX: cell.minX,
        minY: cell.minY,
        maxX: cell.maxX,
        maxY: cell.maxY
      };

      return;
    }

    if (newPosition.x < prev.minX || newPosition.x > prev.maxX || newPosition.z < prev.minY || newPosition.z > prev.maxY) {
      gridW.updateActorCell(this);
      const newCell: TSpatialCell | undefined = this.spatial.getSpatialCell();
      if (isDefined(newCell)) {
        prev = {
          maxX: newCell.maxX,
          maxY: newCell.maxY,
          minX: newCell.minX,
          minY: newCell.minY
        };
      }
    }
  }

  return {
    updateSpatialCell
  };
}
