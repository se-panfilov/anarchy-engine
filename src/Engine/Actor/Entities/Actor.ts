import type { Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, distinctUntilChanged } from 'rxjs';
import type { Euler } from 'three';
import { Vector3 } from 'three';

import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import type { ActorDrive } from '@/Engine/Actor/Constants';
import type { TActor, TActorDependencies, TActorEntities, TActorParams } from '@/Engine/Actor/Models';
import { applySpatialGrid, startCollisions } from '@/Engine/Actor/Utils';
import { withCollisions } from '@/Engine/Collisions';
import { withKinematic } from '@/Engine/Kinematic';
import type { TModel3d } from '@/Engine/Models3d';
import { withModel3d } from '@/Engine/Models3d';
import type { TSpatialLoopServiceValue } from '@/Engine/Spatial';
import { withSpatial, withUpdateSpatialCell } from '@/Engine/Spatial';
import { isDefined } from '@/Engine/Utils';

export function Actor(
  params: TActorParams,
  { kinematicLoopService, spatialLoopService, spatialGridService, collisionsLoopService, collisionsService, models3dService, model3dToActorConnectionRegistry }: TActorDependencies
): TActor {
  const position$: BehaviorSubject<Vector3> = new BehaviorSubject<Vector3>(params.position);
  const rotation$: BehaviorSubject<Euler> = new BehaviorSubject<Euler>(params.rotation);
  const scale$: BehaviorSubject<Vector3> = new BehaviorSubject<Vector3>(params.scale ?? new Vector3());
  const drive$: BehaviorSubject<ActorDrive> = new BehaviorSubject<ActorDrive>(params.drive);

  const isModelAlreadyInUse: boolean = isDefined(model3dToActorConnectionRegistry.findByModel3d(params.model3dSource));
  const model3d: TModel3d = isModelAlreadyInUse ? models3dService.clone(params.model3dSource) : params.model3dSource;

  const positionSub$: Subscription = position$
    .pipe(distinctUntilChanged((prev: Vector3, curr: Vector3): boolean => prev.equals(curr)))
    .subscribe((position: Vector3): Vector3 => model3d.getRawModel3d().position.copy(position));
  const rotationSub$: Subscription = rotation$
    .pipe(distinctUntilChanged((prev: Euler, curr: Euler): boolean => prev.equals(curr)))
    .subscribe((rotation: Euler): Euler => model3d.getRawModel3d().rotation.copy(rotation));
  const scaleSub$: Subscription = scale$
    .pipe(distinctUntilChanged((prev: Vector3, curr: Vector3): boolean => prev.equals(curr)))
    .subscribe((scale: Vector3): Vector3 => model3d.getRawModel3d().scale.copy(scale));

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
    ...withKinematic(params, kinematicLoopService, drive$),
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

  abstract.destroy$.subscribe(() => {
    //Remove model3d registration
    model3dToActorConnectionRegistry.removeByModel3d(model3d);

    //Finish subscriptions
    spatialSub$.unsubscribe();
    positionSub$.unsubscribe();
    rotationSub$.unsubscribe();
    scaleSub$.unsubscribe();

    //Stop subjects
    position$.complete();
    position$.unsubscribe();
    rotation$.complete();
    rotation$.unsubscribe();
    scale$.complete();
    scale$.unsubscribe();

    // Destroy related entities
    model3d.destroy$.next();
    entities.spatial.destroy$.next();
    entities.collisions?.destroy$.next();
    entities.kinematic.destroy$.next();
    // TODO 8.0.0. MODELS: implement destroy of physics mixin (or remoe it if not needed)
    entities.physicsBody.destroy$.next();
  });

  // TODO 8.0.0. MODELS: perhaps do this only once (without "if"'s), then just read this value from kinematic/physics and throw error if the drive is not None
  combineLatest([position$, rotation$, scale$]).subscribe(([position, rotation, scale]: [Vector3, Euler, Vector3]): void => {
    // TODO 8.0.0. MODELS: should it take in account scale and rotation? Otherwise trigger it only for position
    entities.updateSpatialCells(position);
  });

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
