import type { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';
import type { Vector3 } from 'three';

import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import type { TActor, TActorDependencies, TActorEntities, TActorParams } from '@/Engine/Actor/Models';
import { ActorTransformDrive } from '@/Engine/Actor/TransformDrive';
import { applySpatialGrid, startCollisions } from '@/Engine/Actor/Utils';
import { withCollisions } from '@/Engine/Collisions';
import type { TModel3d } from '@/Engine/Models3d';
import { withModel3d } from '@/Engine/Models3d';
import type { TSpatialLoopServiceValue } from '@/Engine/Spatial';
import { withSpatial, withUpdateSpatialCell } from '@/Engine/Spatial';
import type { TDriveToModel3dConnector, TTransformDrive } from '@/Engine/TransformDrive';
import { DriveToModel3dConnector } from '@/Engine/TransformDrive';
import { isDefined } from '@/Engine/Utils';

export function Actor(
  params: TActorParams,
  { kinematicLoopService, spatialLoopService, spatialGridService, collisionsLoopService, collisionsService, models3dService, model3dToActorConnectionRegistry }: TActorDependencies
): TActor {
  const isModelAlreadyInUse: boolean = isDefined(model3dToActorConnectionRegistry.findByModel3d(params.model3dSource));
  const model3d: TModel3d = isModelAlreadyInUse ? models3dService.clone(params.model3dSource) : params.model3dSource;

  // Init TransformDrive
  const drive: TTransformDrive = ActorTransformDrive(params, kinematicLoopService);
  const driveToModel3dConnector: TDriveToModel3dConnector = DriveToModel3dConnector(drive, model3d);

  // TODO CWP:
  // TODO 8.0.0. MODELS: In ActorDriver implement external change of position$/rotation$/scale$ and make sure it works

  // TODO 8.0.0. MODELS: Implement PhysicsAgent
  // TODO 8.0.0. MODELS: Connect Physics body with the PhysicsAgent
  // TODO 8.0.0. MODELS: Make sure external change of position$/rotation$/scale$ works with the PhysicsAgent

  // TODO 8.0.0. MODELS: Make spatial is working
  // TODO 8.0.0. MODELS: Make collisions are working

  // TODO 8.0.0. MODELS: Make sure it works with the Kinematic agent
  // TODO 8.0.0. MODELS: Make sure it works with the Physics agent
  // TODO 8.0.0. MODELS: Make sure it works with the Connected agent

  // TODO 8.0.0. MODELS: Add a showcase with runtime switch between agents (check spatial and collisions)

  // TODO 8.0.0. MODELS: Make sure that on creation of Actor we apply actor's position$/rotation$/scale$ to model3d

  // const { value$: position$, update: updatePosition } = withReactivePosition(model3d);
  // const { value$: rotation$, update: updateRotation } = withReactiveRotation(model3d);

  const entities: TActorEntities = {
    drive,
    ...withModel3d(model3d),
    ...withSpatial(params),
    ...withCollisions(params, collisionsService, collisionsLoopService),
    ...withUpdateSpatialCell()
  };

  // TODO 8.0.0. MODELS: This might not be triggered if vectors aren't cloned (considered as the same, due to the same reference)
  const positionSub$: Subscription = drive.position$.pipe(distinctUntilChanged((prev: Vector3, curr: Vector3): boolean => prev.equals(curr))).subscribe((position: Vector3): void => {
    // TODO 8.0.0. MODELS: not sure if "updateSpatialCells()" should happen on rotation$ and scale$ changes
    entities.updateSpatialCells(position);
  });

  const actor: TActor = {
    ...AbstractEntity(entities, EntityType.Actor, params),
    position$: drive.position$,
    rotation$: drive.rotation$,
    scale$: drive.scale$
  };

  const spatialSub$: Subscription = spatialLoopService.tick$.subscribe(({ priority }: TSpatialLoopServiceValue): void => {
    if (!entities.spatial.isAutoUpdate()) return;
    if (entities.spatial.getSpatialUpdatePriority() >= priority) {
      // TODO 8.0.0. MODELS: Fix the following code
      // updatePosition();
      // updateRotation();
    }
  });

  actor.destroy$.subscribe(() => {
    //Remove model3d registration
    model3dToActorConnectionRegistry.removeByModel3d(model3d);

    //Finish subscriptions
    spatialSub$.unsubscribe();
    positionSub$.unsubscribe();

    // Destroy related entities
    driveToModel3dConnector.destroy$.next();
    model3d.destroy$.next();
    entities.spatial.destroy$.next();
    entities.collisions?.destroy$.next();
  });

  applySpatialGrid(params, actor, spatialGridService);

  // TODO 8.0.0. MODELS: check how collisions works with the model3d?
  startCollisions(actor);

  model3dToActorConnectionRegistry.addModel3d(model3d, actor);

  return actor;
}
