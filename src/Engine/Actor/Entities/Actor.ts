import type { Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { Euler, Vector3 } from 'three';

import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import type { ActorDrive } from '@/Engine/Actor/Constants';
import type { TActor, TActorDependencies, TActorEntities, TActorParams } from '@/Engine/Actor/Models';
import { applySpatialGrid, startCollisions } from '@/Engine/Actor/Utils';
import { withCollisions } from '@/Engine/Collisions';
import { withKinematic } from '@/Engine/Kinematic';
import type { TModel3d } from '@/Engine/Models3d';
import { withModel3d } from '@/Engine/Models3d';
import type { TSpatialLoopServiceValue } from '@/Engine/Spatial';
import { withReactivePosition, withReactiveRotation, withSpatial, withUpdateSpatialCell } from '@/Engine/Spatial';
import { applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

export function Actor(
  params: TActorParams,
  { kinematicLoopService, spatialLoopService, spatialGridService, collisionsLoopService, collisionsService, models3dService, model3dToActorConnectionRegistry }: TActorDependencies
): TActor {
  const position$: Subject<Vector3> = new Subject<Vector3>();
  const rotation$: Subject<Euler> = new Subject<Euler>();
  const scale$: Subject<Vector3> = new Subject<Vector3>();
  const drive$: BehaviorSubject<ActorDrive> = new BehaviorSubject<ActorDrive>(params.drive);

  const isModelAlreadyInUse: boolean = isDefined(model3dToActorConnectionRegistry.findByModel3d(params.model3dSource));
  const model3d: TModel3d = isModelAlreadyInUse ? models3dService.clone(params.model3dSource) : params.model3dSource;

  // TODO 8.0.0. MODELS: maybe not needed at all, cause we can check current drive in mixins
  // drive$.subscribe((drive: ActorDrive): void => {
  //   if (drive === ActorDrive.Kinematic) {
  //     // TODO 8.0.0. MODELS: implement
  //     // stopPhysicsDrive();
  //     startKinematicDrive();
  //   } else if (drive === ActorDrive.Physical) {
  //     stopKinematicDrive();
  //     // TODO 8.0.0. MODELS: implement
  //     // startPhysicsDrive();
  //   } else {
  //     // TODO 8.0.0. MODELS: implement
  //     // stopKinematicDrive();
  //     // stopPhysicsDrive();
  //   }
  // });

  // TODO CWP The Actor flow is the following:
  //  Case "Kinematic":
  //  Kinematic mixin should have position$ and rotation$ (which piped to return Vector3 and Euler)
  //  ✅ "doKinematicMove", "doKinematicRotation" should update Kinematic's position$ and rotation$
  //  Actor is subscribed to Kinematic's position$ and rotation$
  //  Model3d is subscribed to Actor's position$/rotation$/scale$
  //  When Actor's position$/rotation$/scale$ updated, Model3d updates its position/rotation/scale
  //  External update of Actor's position$/rotation$ is forbidden (scale$ is allowed)
  //  Kinematic mixin should have "teleport" method which updates Kinematic's position$ and rotation$ immediately (if rotation is set, also update angle, and the speed should be set to 0)
  //  --
  //  Case "Physics":
  //  Physics mixin should have position$ and rotation$ (not sure if we need to  pipe them to return Vector3 and Euler)
  //  Actor is subscribed to Physics's position$, rotation$ (and maybe scale$)
  //  Model3d is subscribed to Actor's position$/rotation$/scale$
  //  When Actor's position$/rotation$/scale$ updated, Model3d updates its position/rotation/scale
  //  External update of Actor's position$/rotation$/scale$ is forbidden
  //  Physics mixin should have "teleport" method which updates Physics's position$ and rotation$ immediately (and scale$?). Check with Rapier docs
  //  --
  //  Case "None":
  //  External update of Actor's position$/rotation$/scale$ is allowed (do nothing with Kinematic/Physics)

  // TODO 8.0.0. MODELS: position$, rotation$, scale$ should update related model3d values

  // const { value$: position$, update: updatePosition } = withReactivePosition(model3d);
  // const { value$: rotation$, update: updateRotation } = withReactiveRotation(model3d);

  const entities: TActorEntities = {
    ...withModel3d(model3d),
    // TODO 8.0.0. MODELS: Kinematic should update rotation (and position?) (if "drive" is "kinematic")
    // TODO 8.0.0. MODELS: Physics should update position and rotation (if "drive" is "physics")
    ...withKinematic(params, kinematicLoopService, drive$, { position$, rotation$ }),
    ...withSpatial(params),
    ...withCollisions(params, collisionsService, collisionsLoopService),
    ...withUpdateSpatialCell()
  };

  const abstract = AbstractEntity(entities, EntityType.Actor, params);

  const spatialSub$: Subscription = spatialLoopService.tick$.subscribe(({ priority }: TSpatialLoopServiceValue): void => {
    if (!entities.spatial.isAutoUpdate()) return;
    if (entities.spatial.getSpatialUpdatePriority() >= priority) {
      updatePosition();
      updateRotation();
    }
  });

  abstract.destroyed$.subscribe(() => {
    kinematicSub$.unsubscribe();
    spatialSub$.unsubscribe();
    position$.unsubscribe();
    position$.complete();
    rotation$.unsubscribe();
    rotation$.complete();
    entities.spatial.destroy();
    entities.collisions?.destroy();
    model3dToActorConnectionRegistry.removeByModel3d(model3d);
    model3d.destroy();
  });

  let oldPosition: Vector3 = new Vector3();
  let oldRotation: Euler = new Euler();
  let oldScale: Vector3 = new Vector3();

  // TODO 8.0.0. MODELS: perhaps do this only once (without "if"'s), then just read this value from kinematic/physics and throw error if the drive is not None
  combineLatest([position$, rotation$, scale$]).subscribe(([position, rotation, scale]: [Vector3, Euler, Vector3]): void => {
    // TODO 8.0.0. MODELS: if drive is Physics, should also apply these props to the rigid body
    if (!position.equals(oldPosition)) {
      oldPosition = position;
      applyPosition(entities, position);
    }

    if (!rotation.equals(oldRotation)) {
      oldRotation = rotation;
      applyRotation(entities, rotation);
    }

    if (!scale.equals(oldScale)) {
      oldScale = scale;
      applyScale(entities, scale);
    }

    // TODO 8.0.0. MODELS: should it take in account scale and rotation? Otherwise trigger it only for position
    entities.updateSpatialCells(position);
  });

  // TODO 8.0.0. MODELS: check: should be applied both for actor and model3d
  // applyPosition(entities, params.position);
  // TODO 8.0.0. MODELS: check: should be applied both for actor and model3d
  // applyRotation(entities, params.rotation);
  // TODO 8.0.0. MODELS: do we need to apply scale for actor?

  if (isDefined(params.scale)) applyScale(entities, params.scale);
  applySpatialGrid(params, entities, spatialGridService);

  // TODO 8.0.0. MODELS: check how collisions works with the model3d?
  startCollisions(entities);

  model3dToActorConnectionRegistry.addModel3d(model3d, entities);

  return {
    ...abstract,
    position$,
    rotation$,
    scale$,
    drive$
  };
}
