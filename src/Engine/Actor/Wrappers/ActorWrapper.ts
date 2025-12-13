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
import { withTextures } from '@/Engine/Texture';
import { applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

export function ActorWrapper(
  params: TActorParams,
  { materialTextureService, kinematicLoopService, spatialLoopService, spatialGridService, collisionsLoopService, collisionsService }: TActorDependencies
): TActorWrapper {
  const entity: TModel3dFacade = params.model3d;
  const model3d: Group | Mesh | Object3D = entity.getModel();

  // TODO (S.Panfilov) CWP don't think we need "withMaterial" in actor anymore
  const withMaterialEntity: TWithMaterial = withMaterial(entity);

  const { value$: position$, update: updatePosition } = withReactivePosition(model3d);
  const { value$: rotation$, update: updateRotation } = withReactiveRotation(model3d);

  const actorW: TActorWrapper = {
    ...AbstractWrapper(entity, WrapperType.Actor, params),
    ...withMoveBy3dMixin(model3d),
    ...withRotationByXyzMixin(model3d),
    ...scalableMixin(model3d),
    ...withObject3d(model3d),
    ...withMaterialEntity,
    // TODO (S.Panfilov) CWP don't think we need "withTextures" in actor anymore
    ...withTextures(withMaterialEntity, materialTextureService),
    ...withKinematic(params),
    ...withSpatial(params),
    ...withCollisions(params, collisionsService, collisionsLoopService),
    ...withUpdateSpatialCell(),
    position$: position$.asObservable(),
    rotation$: rotation$.asObservable(),
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
