import type { TActor, TActorDependencies, TActorParams, TActorWithPhysics, TActorWithPhysicsDependencies } from '@/Engine/Actor/Models';
import type { TSpatialGridService, TSpatialGridWrapper } from '@/Engine/Spatial';
import type { TVector3OrEuler } from '@/Engine/ThreeLib';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export const isActorHasPhysicsBody = (actor: TActor | TActorWithPhysics): actor is TActorWithPhysics => isDefined(actor.physicsBody);

export function isBodyServiceDependency(dependencies: TActorDependencies | TActorWithPhysicsDependencies): dependencies is TActorWithPhysicsDependencies {
  return isDefined((dependencies as TActorWithPhysicsDependencies).physicsBodyService);
}

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
  if (isNotDefined(actor.collisions) || !actor.collisions.isAutoUpdate()) return;
  actor.collisions.start(actor);
}

export function isEqualOrSimilar(prev: TVector3OrEuler, curr: TVector3OrEuler, threshold: number): boolean {
  return prev.equals(curr) || (Math.abs(curr.x - prev.x) <= threshold && Math.abs(curr.y - prev.y) <= threshold && Math.abs(curr.z - prev.z) <= threshold);
}
