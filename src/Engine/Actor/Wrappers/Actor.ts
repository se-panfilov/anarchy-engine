import type { Subscription } from 'rxjs';
import type { Group, Mesh, Object3D, Vector3 } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TActorDependencies, TActorParams, TActorWrapper } from '@/Engine/Actor/Models';
import { applySpatialGrid, startCollisions } from '@/Engine/Actor/Wrappers/ActorWrapperHelper';
import { withCollisions } from '@/Engine/Collisions';
import { withKinematic } from '@/Engine/Kinematic';
import { scalableMixin, withMoveBy3dMixin, withRotationByXyzMixin } from '@/Engine/Mixins';
import type { TModel3dFacade } from '@/Engine/Models3d';
import type { TSpatialLoopServiceValue } from '@/Engine/Spatial';
import { withReactivePosition, withReactiveRotation, withSpatial, withUpdateSpatialCell } from '@/Engine/Spatial';
import { applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

// TODO 8.0.0. MODELS: shall we refactor TActorWrapper to TActorFacade?
export function Actor(
  params: TActorParams,
  { kinematicLoopService, spatialLoopService, spatialGridService, collisionsLoopService, collisionsService, models3dService, model3dFacadeToActorConnectionRegistry }: TActorDependencies
): TActorWrapper {
  const isModelAlreadyInUse: boolean = isDefined(model3dFacadeToActorConnectionRegistry.findByModel3dFacade(params.model3dSource));
  const entity: TModel3dFacade = isModelAlreadyInUse ? models3dService.clone(params.model3dSource) : params.model3dSource;
  const model3d: Group | Mesh | Object3D = entity.getModel3d();

  const { value$: position$, update: updatePosition } = withReactivePosition(model3d);
  const { value$: rotation$, update: updateRotation } = withReactiveRotation(model3d);

  const actorW: TActorWrapper = {
    ...AbstractWrapper(entity, WrapperType.Actor, params),

    // TODO 8.0.0. MODELS: perhaps move these mixins to Model3dFacade
    ...withMoveBy3dMixin(model3d),
    ...withRotationByXyzMixin(model3d),
    ...scalableMixin(model3d),

    // TODO CWP Refactor add "withModel3d" mixin and make it facade

    ...withKinematic(params),
    ...withSpatial(params),
    ...withCollisions(params, collisionsService, collisionsLoopService),

    // TODO 8.0.0. MODELS: this mixin should be work properly with Model3dFacade (check if it detects the model's size correctly)
    ...withUpdateSpatialCell(),
    position$: position$.asObservable(),
    rotation$: rotation$.asObservable()
  };

  const kinematicSub$: Subscription = kinematicLoopService.tick$.subscribe((delta: number): void => {
    if (!actorW.kinematic.isAutoUpdate()) return;
    actorW.doKinematicMove(delta);
    actorW.doKinematicRotation(delta);
  });

  const spatialSub$: Subscription = spatialLoopService.tick$.subscribe(({ priority }: TSpatialLoopServiceValue): void => {
    if (!actorW.spatial.isAutoUpdate()) return;
    if (actorW.spatial.getSpatialUpdatePriority() >= priority) {
      updatePosition();
      updateRotation();
    }
  });

  actorW.destroyed$.subscribe(() => {
    kinematicSub$.unsubscribe();
    spatialSub$.unsubscribe();
    position$.unsubscribe();
    position$.complete();
    rotation$.unsubscribe();
    rotation$.complete();
    actorW.spatial.destroy();
    actorW.collisions?.destroy();
    model3dFacadeToActorConnectionRegistry.removeByModel3dFacade(entity);
    entity.destroy();
  });
  // TODO 8.0.0. MODELS: check: should be applied both for actor and model3d
  applyPosition(actorW, params.position);
  // TODO 8.0.0. MODELS: check: should be applied both for actor and model3d
  applyRotation(actorW, params.rotation);
  // TODO 8.0.0. MODELS: do we need to apply scale for actor?

  if (isDefined(params.scale)) applyScale(actorW, params.scale);
  applySpatialGrid(params, actorW, spatialGridService);

  // TODO 8.0.0. MODELS: check how collisions works with the model3d?
  startCollisions(actorW);

  position$.subscribe((newPosition: Vector3): void => actorW.updateSpatialCells(newPosition));

  model3dFacadeToActorConnectionRegistry.addModel3dFacade(entity, actorW);

  return actorW;
}
