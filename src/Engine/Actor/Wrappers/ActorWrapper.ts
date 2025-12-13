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
import { applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

export function ActorWrapper(params: TActorParams, { kinematicLoopService, spatialLoopService, spatialGridService, collisionsLoopService, collisionsService }: TActorDependencies): TActorWrapper {
  const facade: TModel3dFacade = params.model3d;
  const entity: Group | Mesh | Object3D = facade.getModel();

  // TODO 8.0.0. MODELS: MATERIAL MIXIN: decide what to do with this mixin
  // TODO 9.0.0. RESOURCES: Maybe no need in overrides, just create a new instance of a resource
  // TODO Option 1.: Test if this override model's material and maybe keep it here
  // TODO Option 1.: Or move it into TModel3dFacade
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
    getFacade: (): TModel3dFacade => facade,
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
  });

  applyPosition(actorW, params.position);
  applyRotation(actorW, params.rotation);
  if (isDefined(params.scale)) applyScale(actorW, params.scale);
  applyObject3dParams(actorW, params);
  applySpatialGrid(params, actorW, spatialGridService);
  startCollisions(actorW);

  position$.subscribe((newPosition: Vector3): void => actorW.updateSpatialCells(newPosition));

  return actorW;
}
