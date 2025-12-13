import type { TActorParams, TActorWrapper } from '@/Engine/Actor/Models';
import type { TSpatialGridService, TSpatialGridWrapper } from '@/Engine/Spatial';
import { isNotDefined } from '@/Engine/Utils';

export function applySpatialGrid(params: TActorParams, actorW: TActorWrapper, spatialGridService: TSpatialGridService): void {
  if (isNotDefined(params.spatial.grid)) return;

  const gridName: string | undefined = params.spatial.grid.getName();
  if (isNotDefined(gridName)) throw new Error(`Cannot add actor (id: "${actorW.id}") to spatial grid: spatial grid name is not defined`);

  const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName(gridName);
  if (isNotDefined(grid)) throw new Error(`Cannot add actor (id: "${actorW.id}") to spatial grid: "${gridName}", no such grid found`);

  actorW.spatial.setGrid(grid);
  grid.addActor(actorW);
}

export function startCollisions(actorW: TActorWrapper): void {
  if (isNotDefined(actorW.collisions) || !actorW.collisions.isAutoUpdate()) return;
  actorW.collisions.start(actorW);
}
