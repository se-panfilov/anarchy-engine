import type { TActor, TActorDependencies, TActorParams, TActorWithPhysicsDependencies, TActorWrapperWithPhysics } from '@/Engine/Actor/Models';
import type { TSpatialGridService, TSpatialGridWrapper } from '@/Engine/Spatial';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export const isActorHasPhysicsBody = (actor: TActor | TActorWrapperWithPhysics): actor is TActorWrapperWithPhysics => isDefined(actor.physicsBody);

export function isBodyServiceDependency(dependencies: TActorDependencies | TActorWithPhysicsDependencies): dependencies is TActorWithPhysicsDependencies {
  return isDefined((dependencies as TActorWithPhysicsDependencies).physicsBodyService);
}

export function applySpatialGrid(params: TActorParams, actorW: TActor, spatialGridService: TSpatialGridService): void {
  if (isNotDefined(params.spatial.grid)) return;

  const gridName: string | undefined = params.spatial.grid.getName();
  if (isNotDefined(gridName)) throw new Error(`Cannot add actor (id: "${actorW.id}") to spatial grid: spatial grid name is not defined`);

  const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName(gridName);
  if (isNotDefined(grid)) throw new Error(`Cannot add actor (id: "${actorW.id}") to spatial grid: "${gridName}", no such grid found`);

  actorW.spatial.setGrid(grid);
  grid.addActor(actorW);
}

export function startCollisions(actorW: TActor): void {
  if (isNotDefined(actorW.collisions) || !actorW.collisions.isAutoUpdate()) return;
  actorW.collisions.start(actorW);
}
