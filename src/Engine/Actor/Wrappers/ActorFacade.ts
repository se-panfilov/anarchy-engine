import type { Subscription } from 'rxjs';
import type { Vector3 } from 'three';

import { FacadeType } from '@/Engine/Abstract';
import { AbstractFacade } from '@/Engine/Abstract/Wrappers/AbstractFacade';
import type { TActorDependencies, TActorFacade, TActorFacadeEntities, TActorParams } from '@/Engine/Actor/Models';
import { applySpatialGrid, startCollisions } from '@/Engine/Actor/Wrappers/ActorWrapperHelper';
import { withCollisions } from '@/Engine/Collisions';
import { withKinematic } from '@/Engine/Kinematic';
import type { TModel3dFacade } from '@/Engine/Models3d';
import { withModel3dFacade } from '@/Engine/Models3d';
import type { TSpatialLoopServiceValue } from '@/Engine/Spatial';
import { withSpatial, withUpdateSpatialCell } from '@/Engine/Spatial';
import { applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

// TODO 8.0.0. MODELS: Why we call it facades? Just Actor. Just Model3d (however, we need an abstract "class" for it)
// TODO 8.0.0. MODELS: shall we refactor TActorWrapper to TActorFacade?
export function ActorFacade(
  params: TActorParams,
  { kinematicLoopService, spatialLoopService, spatialGridService, collisionsLoopService, collisionsService, models3dService, model3dFacadeToActorConnectionRegistry }: TActorDependencies
): TActorFacade {
  const isModelAlreadyInUse: boolean = isDefined(model3dFacadeToActorConnectionRegistry.findByModel3dFacade(params.model3dSource));
  const model3dF: TModel3dFacade = isModelAlreadyInUse ? models3dService.clone(params.model3dSource) : params.model3dSource;
  // const model3d: Group | Mesh | Object3D = model3dF.getModel3d();
  //
  // const { value$: position$, update: updatePosition } = withReactivePosition(model3d);
  // const { value$: rotation$, update: updateRotation } = withReactiveRotation(model3d);

  const entities: TActorFacadeEntities = {
    ...withModel3dFacade(model3dF),
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
    position$: position$.asObservable(),
    rotation$: rotation$.asObservable()
  };
}
