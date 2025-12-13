import type { TActor, TActorParams } from '@/Engine/Actor/Models';
import type { TSpatialGridService, TSpatialGridWrapper } from '@/Engine/Spatial';
import { isNotDefined } from '@/Engine/Utils';

export const isActorHasPhysicsBody = (actor: TActor): boolean => actor.drive.physical.physicsBody$.value !== undefined;

export function applySpatialGrid(params: TActorParams, actor: TActor, spatialGridService: TSpatialGridService): void {
  if (isNotDefined(params.spatial.grid)) return;

  const gridName: string | undefined = params.spatial.grid.getName();
  if (isNotDefined(gridName)) throw new Error(`Cannot add actor (id: "${actor.id}") to spatial grid: spatial grid name is not defined`);

  const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName(gridName);
  if (isNotDefined(grid)) throw new Error(`Cannot add actor (id: "${actor.id}") to spatial grid: "${gridName}", no such grid found`);

  actor.spatial.setGrid(grid);
  grid.addActor(actor);
}

export function startCollisions(actor: TActor): void {
  if (isNotDefined(actor.collisions) || !actor.collisions.autoUpdate$.value) return;
  actor.collisions.start(actor);
}
