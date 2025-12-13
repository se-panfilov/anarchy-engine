import type { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import { FacadeType } from '@/Engine/Abstract';
import { AbstractFacade } from '@/Engine/Abstract/Wrappers/AbstractFacade';
import { ActorDrive } from '@/Engine/Actor/Constants';
import type { TActorDependencies, TActorFacade, TActorFacadeEntities, TActorParams } from '@/Engine/Actor/Models';
import { applySpatialGrid, startCollisions } from '@/Engine/Actor/Wrappers/ActorWrapperHelper';
import { withCollisions } from '@/Engine/Collisions';
import { withKinematic } from '@/Engine/Kinematic';
import type { TModel3dFacade } from '@/Engine/Models3d';
import { withModel3dFacade } from '@/Engine/Models3d';
import type { TSpatialLoopServiceValue } from '@/Engine/Spatial';
import { withReactivePosition, withSpatial, withUpdateSpatialCell } from '@/Engine/Spatial';
import { applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

// TODO 8.0.0. MODELS: Why we call it facades? Just Actor. Just Model3d (however, we need an abstract "class" for it)
// TODO 8.0.0. MODELS: shall we refactor TActorWrapper to TActorFacade?
export function ActorFacade(
  params: TActorParams,
  { kinematicLoopService, spatialLoopService, spatialGridService, collisionsLoopService, collisionsService, models3dService, model3dFacadeToActorConnectionRegistry }: TActorDependencies
): TActorFacade {
  // TODO 8.0.0. MODELS: Actor should be driven either by kinematic or physics or none (direct applying of position)
  // TODO 8.0.0. MODELS: Allow to switch "drive" it in runtime
  let drive: ActorDrive = ActorDrive.KINEMATIC;

  const setDrive = (mode: ActorDrive): string => (drive = mode);
  const getDrive = (): ActorDrive => drive;

  const position$: Subject<Vector3> = new Subject<Vector3>();
  const rotation$: Subject<Euler> = new Subject<Euler>();
  const scale$: Subject<Vector3> = new Subject<Vector3>();

  // TODO 8.0.0. MODELS: position$, rotation$, scale$ should update related model3d values

  const isModelAlreadyInUse: boolean = isDefined(model3dFacadeToActorConnectionRegistry.findByModel3dFacade(params.model3dSource));
  const model3dF: TModel3dFacade = isModelAlreadyInUse ? models3dService.clone(params.model3dSource) : params.model3dSource;
  // const model3d: Group | Mesh | Object3D = model3dF.getModel3d();
  //
  // const { value$: position$, update: updatePosition } = withReactivePosition(model3d);
  // const { value$: rotation$, update: updateRotation } = withReactiveRotation(model3d);

  const entities: TActorFacadeEntities = {
    ...withModel3dFacade(model3dF),
    // TODO 8.0.0. MODELS: Kinematic should update rotation (and position?) (if "drive" is "kinematic")
    // TODO 8.0.0. MODELS: Physics should update position and rotation (if "drive" is "physics")
    ...withKinematic(params),
    ...withSpatial(params),
    ...withCollisions(params, collisionsService, collisionsLoopService),
    ...withUpdateSpatialCell()
  };

  const facade = AbstractFacade(entities, FacadeType.Actor, params);

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
  // TODO 8.0.0. MODELS: check: should be applied both for actor and model3d
  applyPosition(entities, params.position);
  // TODO 8.0.0. MODELS: check: should be applied both for actor and model3d
  applyRotation(entities, params.rotation);
  // TODO 8.0.0. MODELS: do we need to apply scale for actor?

  if (isDefined(params.scale)) applyScale(entities, params.scale);
  applySpatialGrid(params, entities, spatialGridService);

  // TODO 8.0.0. MODELS: check how collisions works with the model3d?
  startCollisions(entities);

  position$.subscribe((newPosition: Vector3): void => entities.updateSpatialCells(newPosition));

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
