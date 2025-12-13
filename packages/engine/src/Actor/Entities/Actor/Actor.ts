import { nanoid } from 'nanoid';
import type { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, sample, takeUntil, tap } from 'rxjs';
import type { Vector3, Vector3Like } from 'three';

import { AbstractEntity, EntityType } from '@/Abstract';
import { actorToConfig } from '@/Actor/Adapters';
import { withActorStates } from '@/Actor/Mixins';
import type { TActor, TActorConfig, TActorDependencies, TActorEntities, TActorEntityToConfigDependencies, TActorModel3dSettings, TActorParams, TActorTransformDrive } from '@/Actor/Models';
import { ActorTransformDrive } from '@/Actor/TransformDrive';
import { applySpatialGrid, startCollisions } from '@/Actor/Utils';
import { withCollisions } from '@/Collisions';
import type { TFsmWrapper } from '@/Fsm';
import type { TModel3d } from '@/Models3d';
import type { TPhysicsBody } from '@/Physics';
import type { TSpatialLoop } from '@/Spatial';
import { withSpatial, withUpdateSpatialCell } from '@/Spatial';
import type { TReadonlyVector3 } from '@/ThreeLib';
import type { TDriveToTargetConnector } from '@/TransformDrive';
import { DriveToTargetConnector } from '@/TransformDrive';
import type { TWriteable } from '@/Utils';
import { isDefined, isEqualOrSimilarByXyzCoords, mergeAll } from '@/Utils';

export function Actor(
  params: TActorParams,
  { spatialGridService, loopService, collisionsService, models3dService, model3dToActorConnectionRegistry, transformDriveService }: TActorDependencies
): TActor {
  const id: string = EntityType.Actor + '_' + nanoid();
  const isModelAlreadyInUse: boolean = isDefined(model3dToActorConnectionRegistry.findByModel3d(params.model3dSource));
  const model3d: TModel3d = isModelAlreadyInUse ? models3dService.clone(params.model3dSource) : params.model3dSource;

  // Init TransformDrive
  const drive: TActorTransformDrive = ActorTransformDrive(params, { transformDriveService }, id);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, model3d.getRawModel3d(), params.model3dSettings);

  const entities: TActorEntities = mergeAll(
    {
      drive,
      driveToTargetConnector,
      model3d
    },
    withActorStates(params),
    withSpatial(params),
    withCollisions(params, collisionsService, loopService.getCollisionsLoop()),
    withUpdateSpatialCell()
  );

  const actor: TActor = mergeAll(AbstractEntity(entities, EntityType.Actor, { name: params.name, tags: params.tags, id }), {
    serialize: (dependencies: TActorEntityToConfigDependencies): TActorConfig => actorToConfig(actor, dependencies),
    getModel3dSettings: (): TActorModel3dSettings | undefined => params.model3dSettings,
    getPhysicsBody: (): TPhysicsBody | undefined => params.physicsBody
  });

  const spatialLoop: TSpatialLoop = loopService.getSpatialLoop();

  spatialPositionUpdate(spatialLoop, drive.position$, params.spatial.performance?.noiseThreshold ?? 0.000001)
    .pipe(
      filter((): boolean => spatialLoop.shouldUpdateWithPriority(entities.spatial.getSpatialUpdatePriority())),
      takeUntil(actor.destroy$)
    )
    .subscribe((position: TReadonlyVector3): void => actor.updateSpatialCells(position));

  const destroySub$: Subscription = actor.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    //Remove model3d registration
    model3dToActorConnectionRegistry.removeByModel3d(model3d);

    //Destroy related entities
    model3d.destroy$.next();
    entities.spatial.destroy$.next();
    entities.collisions?.destroy$.next();

    //Destroy spatial
    actor.spatial.destroy$.next();

    //Destroy collisions
    actor.collisions.destroy$.next();

    //Destroy Fsm's
    Object.values(entities.states).forEach((value: TFsmWrapper): void => value?.destroy$.next());
    // eslint-disable-next-line functional/immutable-data
    (actor as TWriteable<TActor>).states = {};
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
