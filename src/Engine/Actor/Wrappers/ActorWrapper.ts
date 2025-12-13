import type { Subscription } from 'rxjs';
import type { Group, Mesh, Object3D, Vector3 } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TActorDependencies, TActorParams, TActorWrapper } from '@/Engine/Actor/Models';
import { applySpatialGrid, startCollisions } from '@/Engine/Actor/Wrappers/ActorWrapperHelper';
import { withCollisions } from '@/Engine/Collisions';
import { withKinematic } from '@/Engine/Kinematic';
import type { TWithMaterial } from '@/Engine/Material';
import { withMaterial } from '@/Engine/Material';
import { scalableMixin, withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import type { TModel3dFacade } from '@/Engine/Models3d';
import type { TSpatialLoopServiceValue } from '@/Engine/Spatial';
import { withReactivePosition, withReactiveRotation, withSpatial, withUpdateSpatialCell } from '@/Engine/Spatial';
import { applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

export function ActorWrapper(
  params: TActorParams,
  { kinematicLoopService, spatialLoopService, spatialGridService, collisionsLoopService, collisionsService, models3dService, Model3dToActorConnectionRegistry }: TActorDependencies
): TActorWrapper {
  const isModelAlreadyInUse: boolean = isDefined(Model3dToActorConnectionRegistry.findByModel3d(params.model3dSource));
  const model3dF: TModel3dFacade = isModelAlreadyInUse ? models3dService.clone(params.model3dSource) : params.model3dSource;
  const entity: Group | Mesh | Object3D = model3dF.getModel();

  // TODO 8.0.0. MODELS: MATERIAL MIXIN: decide what to do with this mixin
  const withMaterialEntity: TWithMaterial = withMaterial(entity);

  // TODO 8.0.0. MODELS: options such as "castShadow", "receiveShadow" and etc might be not needed here

  const { value$: position$, update: updatePosition } = withReactivePosition(entity);
  const { value$: rotation$, update: updateRotation } = withReactiveRotation(entity);

  const actorW: TActorWrapper = {
    ...AbstractWrapper(entity, WrapperType.Actor, params),
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...scalableMixin(entity),
    ...withObject3d(entity),
    ...withMaterialEntity,
    ...withKinematic(params),
    ...withSpatial(params),
    ...withCollisions(params, collisionsService, collisionsLoopService),
    ...withUpdateSpatialCell(),
    position$: position$.asObservable(),
    rotation$: rotation$.asObservable(),
    getFacade: (): TModel3dFacade => model3dF,
    entity
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
    Model3dToActorConnectionRegistry.removeByModel3d(model3dF);
  });

  applyPosition(actorW, params.position);
  applyRotation(actorW, params.rotation);
  if (isDefined(params.scale)) applyScale(actorW, params.scale);
  applySpatialGrid(params, actorW, spatialGridService);
  startCollisions(actorW);

  position$.subscribe((newPosition: Vector3): void => actorW.updateSpatialCells(newPosition));

  Model3dToActorConnectionRegistry.addModel3d(model3dF, actorW);

  return actorW;
}
