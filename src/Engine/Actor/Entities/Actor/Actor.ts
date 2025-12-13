import type { Subscription } from 'rxjs';
import type { Vector3 } from 'three';

import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import type { TActor, TActorDependencies, TActorEntities, TActorParams, TActorTransformDrive } from '@/Engine/Actor/Models';
import { ActorTransformDrive } from '@/Engine/Actor/TransformDrive';
import { applySpatialGrid, startCollisions } from '@/Engine/Actor/Utils';
import { withCollisions } from '@/Engine/Collisions';
import type { TModel3d } from '@/Engine/Models3d';
import { withSpatial, withUpdateSpatialCell } from '@/Engine/Spatial';
import type { TDriveToTargetConnector } from '@/Engine/TransformDrive';
import { DriveToTargetConnector } from '@/Engine/TransformDrive';
import { isDefined } from '@/Engine/Utils';

export function Actor(
  params: TActorParams,
  { kinematicLoopService, spatialGridService, collisionsLoopService, collisionsService, models3dService, model3dToActorConnectionRegistry }: TActorDependencies
): TActor {
  const isModelAlreadyInUse: boolean = isDefined(model3dToActorConnectionRegistry.findByModel3d(params.model3dSource));
  const model3d: TModel3d = isModelAlreadyInUse ? models3dService.clone(params.model3dSource) : params.model3dSource;

  // Init TransformDrive
  const drive: TActorTransformDrive = ActorTransformDrive(params, kinematicLoopService);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, model3d.getRawModel3d());

  // TODO CWP:
  // TODO 8.0.0. MODELS: Implement PhysicsAgent
  // TODO 8.0.0. MODELS: Connect Physics body with the PhysicsAgent
  // TODO 8.0.0. MODELS: Make sure external change of position$/rotation$/scale$ works with the PhysicsAgent

  // TODO 8.0.0. MODELS: Make sure, that collisions are working

  // TODO 8.0.0. MODELS: In showcase validate also rotation and scale
  // TODO 8.0.0. MODELS: In showcase check spatial and collisions

  // TODO 8.0.0. MODELS: close all issues (todoes) with tag 8.0.0

  const entities: TActorEntities = {
    drive,
    model3d,
    ...withSpatial(params),
    ...withCollisions(params, collisionsService, collisionsLoopService),
    ...withUpdateSpatialCell()
  };

  const actor: TActor = AbstractEntity(entities, EntityType.Actor, params);

  actor.destroy$.subscribe(() => {
    //Remove model3d registration
    model3dToActorConnectionRegistry.removeByModel3d(model3d);

    //Finish subscriptions
    positionSub$?.unsubscribe();

    // Destroy related entities
    driveToTargetConnector.destroy$.next();
    model3d.destroy$.next();
    entities.spatial.destroy$.next();
    entities.collisions?.destroy$.next();
  });

  // TODO 8.0.0. MODELS: This might not be triggered if vectors aren't cloned (considered as the same, due to the same reference)
  const positionSub$: Subscription = drive.position$.subscribe((position: Vector3): void => {
    // TODO 8.0.0. MODELS: not sure if "updateSpatialCells()" should happen on rotation$ and scale$ changes
    actor.updateSpatialCells(position);
  });

  applySpatialGrid(params, actor, spatialGridService);

  // TODO 8.0.0. MODELS: check how collisions works with the model3d?
  startCollisions(actor);

  model3dToActorConnectionRegistry.addModel3d(model3d, actor);

  return actor;
}
