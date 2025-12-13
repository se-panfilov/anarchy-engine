import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs';
import type { Vector3 } from 'three';

import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import { withActorStates } from '@/Engine/Actor/Mixins';
import type { TActor, TActorDependencies, TActorEntities, TActorParams, TActorTransformDrive } from '@/Engine/Actor/Models';
import { ActorTransformDrive } from '@/Engine/Actor/TransformDrive';
import { applySpatialGrid, startCollisions } from '@/Engine/Actor/Utils';
import { withCollisions } from '@/Engine/Collisions';
import type { TFsmWrapper } from '@/Engine/Fsm';
import type { TModel3d } from '@/Engine/Models3d';
import { withSpatial, withUpdateSpatialCell } from '@/Engine/Spatial';
import type { TDriveToTargetConnector } from '@/Engine/TransformDrive';
import { DriveToTargetConnector } from '@/Engine/TransformDrive';
import { isDefined, isEqualOrSimilarByXyzCoords } from '@/Engine/Utils';

export function Actor(
  params: TActorParams,
  { kinematicLoopService, spatialGridService, physicsBodyService, physicsLoopService, collisionsLoopService, collisionsService, models3dService, model3dToActorConnectionRegistry }: TActorDependencies
): TActor {
  const id: string = EntityType.Actor + '_' + nanoid();
  const isModelAlreadyInUse: boolean = isDefined(model3dToActorConnectionRegistry.findByModel3d(params.model3dSource));
  const model3d: TModel3d = isModelAlreadyInUse ? models3dService.clone(params.model3dSource) : params.model3dSource;

  // Init TransformDrive
  const drive: TActorTransformDrive = ActorTransformDrive(params, { kinematicLoopService, physicsBodyService, physicsLoopService }, id);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, model3d.getRawModel3d(), params.model3dSettings);

  // TODO CWP:
  // TODO 8.0.0. MODELS: Close all todoes with tag 9.0.0
  // TODO 8.0.0. MODELS: Close all todoes with tag 9.2.0
  // TODO 8.0.0. MODELS: Close all todoes with tag 10.0.0
  // TODO 8.0.0. MODELS: Take a look to todoes with tag ANIMATIONS (uploading animations separately from a model)
  // TODO 8.0.0. MODELS: Take a look to todoes with tag Layers
  // TODO 8.0.0. MODELS: GET RID OF PROPS (Use params as defaults, and configs as extended)
  // TODO 8.0.0. MODELS: Get rid of withTagsEntity (keep only with readonly tags), methods such as hasTag, addTah, should be in utils

  const entities: TActorEntities = {
    // TODO ACTOR: state encapsulate AI (connection)
    // TODO ACTOR: state encapsulate sounds
    drive,
    model3d,
    ...withActorStates(params),
    ...withSpatial(params),
    ...withCollisions(params, collisionsService, collisionsLoopService),
    ...withUpdateSpatialCell()
  };

  const actor: TActor = AbstractEntity(entities, EntityType.Actor, { ...params, id });

  // if (params.states?.animationsFsm) {
  //   console.log('XXX applied!');
  //   actor.setAnimationsFsm(params.states.animationsFsm);
  // }

  // console.log('XXX7', actor.states);

  actor.destroy$.subscribe((): void => {
    //Remove model3d registration
    model3dToActorConnectionRegistry.removeByModel3d(model3d);

    //Finish subscriptions
    positionSub$?.unsubscribe();

    // Destroy related entities
    driveToTargetConnector.destroy$.next();
    model3d.destroy$.next();
    entities.spatial.destroy$.next();
    entities.collisions?.destroy$.next();

    //stop Fsm's
    Object.values(entities.states).forEach((value: TFsmWrapper): void => value.destroy$.next());
  });

  const spatialNoiseThreshold: number = params.spatial.performance?.noiseThreshold ?? 0.0000001;
  const prevValue: Float32Array = new Float32Array([0, 0, 0]);
  // TODO 8.0.0. MODELS: Can we move updateSpatialCells somewhere? (in mixin?)
  // TODO 10.0.0. LOOPS: Position/rotations/scale should have an own loop independent from frame rate (driven by time)
  const positionSub$: Subscription = drive.position$
    .pipe(
      distinctUntilChanged((_prev: Vector3, curr: Vector3): boolean => isEqualOrSimilarByXyzCoords(prevValue[0], prevValue[1], prevValue[2], curr.x, curr.y, curr.z, spatialNoiseThreshold)),
      tap((value: Vector3): void => {
        // eslint-disable-next-line functional/immutable-data
        prevValue[0] = value.x;
        // eslint-disable-next-line functional/immutable-data
        prevValue[1] = value.y;
        // eslint-disable-next-line functional/immutable-data
        prevValue[2] = value.z;
      })
    )
    // I'm not sure if we need to update spatial cells as well on rotation or scale is change
    .subscribe((position: Vector3): void => actor.updateSpatialCells(position));

  applySpatialGrid(params, actor, spatialGridService);

  startCollisions(actor);

  model3dToActorConnectionRegistry.addModel3d(model3d, actor);

  return actor;
}
