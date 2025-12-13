import { nanoid } from 'nanoid';
import type { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, sample, tap } from 'rxjs';
import type { Vector3 } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import { withActorStates } from '@/Engine/Actor/Mixins';
import type { TActor, TActorDependencies, TActorEntities, TActorParams, TActorTransformDrive } from '@/Engine/Actor/Models';
import { ActorTransformDrive } from '@/Engine/Actor/TransformDrive';
import { applySpatialGrid, startCollisions } from '@/Engine/Actor/Utils';
import { withCollisions } from '@/Engine/Collisions';
import type { TFsmWrapper } from '@/Engine/Fsm';
import type { TModel3d } from '@/Engine/Models3d';
import type { TSpatialLoop } from '@/Engine/Spatial';
import { withSpatial, withUpdateSpatialCell } from '@/Engine/Spatial';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TDriveToTargetConnector } from '@/Engine/TransformDrive';
import { DriveToTargetConnector } from '@/Engine/TransformDrive';
import { isDefined, isEqualOrSimilarByXyzCoords } from '@/Engine/Utils';

export function Actor(params: TActorParams, { spatialGridService, physicsBodyService, loopService, collisionsService, models3dService, model3dToActorConnectionRegistry }: TActorDependencies): TActor {
  const id: string = EntityType.Actor + '_' + nanoid();
  const isModelAlreadyInUse: boolean = isDefined(model3dToActorConnectionRegistry.findByModel3d(params.model3dSource));
  const model3d: TModel3d = isModelAlreadyInUse ? models3dService.clone(params.model3dSource) : params.model3dSource;

  // Init TransformDrive
  const drive: TActorTransformDrive = ActorTransformDrive(params, { physicsBodyService, loopService }, id);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, model3d.getRawModel3d(), params.model3dSettings);

  const entities: TActorEntities = {
    // TODO ACTOR: state encapsulate AI (connection)
    // TODO ACTOR: state encapsulate sounds
    drive,
    model3d,
    ...withActorStates(params),
    ...withSpatial(params),
    ...withCollisions(params, collisionsService, loopService.getCollisionsLoop()),
    ...withUpdateSpatialCell()
  };

  const actor: TActor = AbstractEntity(entities, EntityType.Actor, { ...params, id });

  const spatialLoop: TSpatialLoop = loopService.getSpatialLoop();
  const positionChangeSub$: Subscription = spatialPositionUpdate(spatialLoop, drive.position$, params.spatial.performance?.noiseThreshold ?? 0.000001).subscribe((position: TReadonlyVector3): void => {
    if (entities.spatial.getSpatialUpdatePriority() < spatialLoop.priority$.value) return;
    actor.updateSpatialCells(position);
  });

  actor.destroy$.subscribe((): void => {
    //Remove model3d registration
    model3dToActorConnectionRegistry.removeByModel3d(model3d);

    //Finish subscriptions
    positionChangeSub$?.unsubscribe();

    // Destroy related entities
    driveToTargetConnector.destroy$.next();
    model3d.destroy$.next();
    entities.spatial.destroy$.next();
    entities.collisions?.destroy$.next();

    //stop Fsm's
    Object.values(entities.states).forEach((value: TFsmWrapper): void => value.destroy$.next());
  });

  applySpatialGrid(params, actor, spatialGridService);
  startCollisions(actor);

  model3dToActorConnectionRegistry.addModel3d(model3d, actor);

  return actor;
}

function spatialPositionUpdate<T extends Vector3Like | Vector3 | TReadonlyVector3>(spatialLoop: TSpatialLoop, position$: BehaviorSubject<T>, noiseThreshold?: number): Observable<Readonly<T>> {
  const prevValue: Float32Array = new Float32Array([0, 0, 0]);

  return position$.pipe(
    distinctUntilChanged((_prev: T, curr: T): boolean => isEqualOrSimilarByXyzCoords(prevValue[0], prevValue[1], prevValue[2], curr.x, curr.y, curr.z, noiseThreshold ?? 0)),
    tap((value: T): void => {
      // eslint-disable-next-line functional/immutable-data
      prevValue[0] = value.x;
      // eslint-disable-next-line functional/immutable-data
      prevValue[1] = value.y;
      // eslint-disable-next-line functional/immutable-data
      prevValue[2] = value.z;
    }),
    sample(spatialLoop.tick$)
  );
}
