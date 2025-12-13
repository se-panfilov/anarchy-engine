import type { Subscription } from 'rxjs';
import { combineLatest, Subject } from 'rxjs';
import { Euler, Vector3 } from 'three';

import { EntityType } from '@/Engine/Abstract';
import { AbstractEntity } from '@/Engine/Abstract/Wrappers/AbstractEntity';
import type { ActorDrive } from '@/Engine/Actor/Constants';
import type { TActor, TActorDependencies, TActorEntities, TActorParams } from '@/Engine/Actor/Models';
import { applySpatialGrid, startCollisions } from '@/Engine/Actor/Wrappers/ActorHelper';
import { withCollisions } from '@/Engine/Collisions';
import { withKinematic } from '@/Engine/Kinematic';
import type { TModel3d } from '@/Engine/Models3d';
import { withModel3d } from '@/Engine/Models3d';
import type { TSpatialLoopServiceValue } from '@/Engine/Spatial';
import { withReactivePosition, withReactiveRotation, withSpatial, withUpdateSpatialCell } from '@/Engine/Spatial';
import { applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

export function Actor(
  params: TActorParams,
  { kinematicLoopService, spatialLoopService, spatialGridService, collisionsLoopService, collisionsService, models3dService, model3dFacadeToActorConnectionRegistry }: TActorDependencies
): TActor {
  // TODO 8.0.0. MODELS: Allow to switch "drive" it in runtime
  let drive: ActorDrive = params.drive;

  const setDrive = (mode: ActorDrive): string => (drive = mode);
  const getDrive = (): ActorDrive => drive;

  const position$: Subject<Vector3> = new Subject<Vector3>();
  const rotation$: Subject<Euler> = new Subject<Euler>();
  const scale$: Subject<Vector3> = new Subject<Vector3>();

  // TODO 8.0.0. MODELS: position$, rotation$, scale$ should update related model3d values

  const isModelAlreadyInUse: boolean = isDefined(model3dFacadeToActorConnectionRegistry.findByModel3dFacade(params.model3dSource));
  const model3dF: TModel3d = isModelAlreadyInUse ? models3dService.clone(params.model3dSource) : params.model3dSource;

  // const { value$: position$, update: updatePosition } = withReactivePosition(model3d);
  // const { value$: rotation$, update: updateRotation } = withReactiveRotation(model3d);

  const entities: TActorEntities = {
    ...withModel3d(model3dF),
    // TODO 8.0.0. MODELS: Kinematic should update rotation (and position?) (if "drive" is "kinematic")
    // TODO 8.0.0. MODELS: Physics should update position and rotation (if "drive" is "physics")
    ...withKinematic(params),
    ...withSpatial(params),
    ...withCollisions(params, collisionsService, collisionsLoopService),
    ...withUpdateSpatialCell()
  };

  const facade = AbstractEntity(entities, EntityType.Actor, params);

  const kinematicSub$: Subscription = kinematicLoopService.tick$.subscribe((delta: number): void => {
    if (!entities.kinematic.isAutoUpdate()) return;
    entities.doKinematicMove(delta);
    entities.doKinematicRotation(delta);
  });

  const spatialSub$: Subscription = spatialLoopService.tick$.subscribe(({ priority }: TSpatialLoopServiceValue): void => {
    if (!entities.spatial.isAutoUpdate()) return;
    if (entities.spatial.getSpatialUpdatePriority() >= priority) {
      updatePosition();
      updateRotation();
    }
  });

  facade.destroyed$.subscribe(() => {
    kinematicSub$.unsubscribe();
    spatialSub$.unsubscribe();
    position$.unsubscribe();
    position$.complete();
    rotation$.unsubscribe();
    rotation$.complete();
    entities.spatial.destroy();
    entities.collisions?.destroy();
    model3dFacadeToActorConnectionRegistry.removeByModel3dFacade(model3dF);
    model3dF.destroy();
  });

  let oldPosition: Vector3 = new Vector3();
  let oldRotation: Euler = new Euler();
  let oldScale: Vector3 = new Vector3();

  combineLatest([position$, rotation$, scale$]).subscribe(([position, rotation, scale]: [Vector3, Euler, Vector3]): void => {
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

  model3dFacadeToActorConnectionRegistry.addModel3dFacade(model3dF, entities);

  return {
    ...facade,
    setDrive,
    getDrive,
    position$,
    rotation$,
    scale$
  };
}
