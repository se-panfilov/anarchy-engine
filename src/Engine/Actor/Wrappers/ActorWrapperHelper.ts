import type { TActorParams, TActorWrapperAsync } from '@/Engine/Actor/Models';
import type { TSpatialGridService, TSpatialGridWrapper } from '@/Engine/Spatial';
import { isNotDefined } from '@/Engine/Utils';

export function applySpatialGrid(params: TActorParams, actorW: TActorWrapperAsync, spatialGridService: TSpatialGridService): void {
  if (params.spatial?.grid) {
    const gridName: string | undefined = params.spatial?.grid.getName();
    if (isNotDefined(gridName)) throw new Error(`Cannot add actor (id: "${actorW.id}") to spatial grid: spatial grid name is not defined`);
    const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName(gridName);
    if (isNotDefined(grid)) throw new Error(`Cannot add actor (id: "${actorW.id}") to spatial grid: "${gridName}", no such grid found`);
    actorW.spatial.setGrid(grid);
    grid.addActor(actorW);
  }
}
