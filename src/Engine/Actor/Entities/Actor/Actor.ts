import type { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';
import type { Vector3 } from 'three';

import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import { ActorDriver } from '@/Engine/Actor/Constants';
import { ActorDrive, DriveToModel3dConnector } from '@/Engine/Actor/Drive';
import { InstantActorDriver } from '@/Engine/Actor/Drive/Drivers';
import type { TActor, TActorDependencies, TActorDrive, TActorDrivers, TActorEntities, TActorParams, TDriveToModel3dConnector, TInstantActorDriver } from '@/Engine/Actor/Models';
import { applySpatialGrid, startCollisions } from '@/Engine/Actor/Utils';
import { withCollisions } from '@/Engine/Collisions';
import type { TKinematicActorDriver } from '@/Engine/Kinematic';
import { KinematicActorDriver } from '@/Engine/Kinematic';
import type { TModel3d } from '@/Engine/Models3d';
import { withModel3d } from '@/Engine/Models3d';
import type { TPhysicsActorDriver } from '@/Engine/Physics';
import { PhysicsActorDriver } from '@/Engine/Physics';
import type { TSpatialLoopServiceValue } from '@/Engine/Spatial';
import { withSpatial, withUpdateSpatialCell } from '@/Engine/Spatial';
import { isDefined } from '@/Engine/Utils';

export function Actor(
  params: TActorParams,
  { kinematicLoopService, spatialLoopService, spatialGridService, collisionsLoopService, collisionsService, models3dService, model3dToActorConnectionRegistry }: TActorDependencies
): TActor {
  const isModelAlreadyInUse: boolean = isDefined(model3dToActorConnectionRegistry.findByModel3d(params.model3dSource));
  const model3d: TModel3d = isModelAlreadyInUse ? models3dService.clone(params.model3dSource) : params.model3dSource;

  const kinematicDriver: TKinematicActorDriver = KinematicActorDriver(params, kinematicLoopService);
  const physicsDriver: TPhysicsActorDriver = PhysicsActorDriver(params);
  const instantDriver: TInstantActorDriver = InstantActorDriver(params);
  const drivers: TActorDrivers = { [ActorDriver.Kinematic]: kinematicDriver, [ActorDriver.Physical]: physicsDriver, [ActorDriver.Instant]: instantDriver };
  const drive: TActorDrive = ActorDrive(params, drivers);
  const driveToModel3dConnector: TDriveToModel3dConnector = DriveToModel3dConnector(drive, model3d);

  // TODO CWP:
  // TODO 8.0.0. MODELS: Finish Actor's implementation, make sure it works with the KinematicDriver
  // TODO 8.0.0. MODELS: In ActorDriver implement external change of position$/rotation$/scale$ and make sure it works
  // TODO 8.0.0. MODELS: Implement PhysicsDriver
  // TODO 8.0.0. MODELS: Connect Physics body with the PhysicsDriver
  // TODO 8.0.0. MODELS: Make sure it works with the Physics
  // TODO 8.0.0. MODELS: Make sure external change of position$/rotation$/scale$ works with the PhysicsDriver
  // TODO 8.0.0. MODELS: Make spatial is working
  // TODO 8.0.0. MODELS: Make collisions are working
  // TODO 8.0.0. MODELS: Make actor workable with ActorDriver.Instant (let user set values directly)

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
