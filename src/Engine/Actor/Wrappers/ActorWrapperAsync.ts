import type { Subscription } from 'rxjs';
import type { Group, Mesh, Vector3 } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TActorDependencies, TActorParams, TActorWrapperAsync } from '@/Engine/Actor/Models';
import { createActorModel3d } from '@/Engine/Actor/Wrappers/ActorUtils';
import { applySpatialGrid, startCollisions } from '@/Engine/Actor/Wrappers/ActorWrapperHelper';
import { withCollisions } from '@/Engine/Collisions';
import { withKinematic } from '@/Engine/Kinematic';
import type { TWithMaterial } from '@/Engine/Material';
import { withMaterial } from '@/Engine/Material';
import { scalableMixin, withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import type { TModel3dLoadResult } from '@/Engine/Models3d';
import { Model3dType } from '@/Engine/Models3d';
import type { TSpatialLoopServiceValue } from '@/Engine/Spatial';
import { withReactivePosition, withReactiveRotation, withSpatial, withUpdateSpatialCell } from '@/Engine/Spatial';
import { withTextures } from '@/Engine/Texture';
import { applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

export async function ActorWrapperAsync(
  params: TActorParams,
  { materialTextureService, models3dService, kinematicLoopService, spatialLoopService, spatialGridService, collisionsLoopService, collisionsService }: TActorDependencies
): Promise<TActorWrapperAsync> {
  const isPrimitiveModel3d: boolean = [...Object.values(Model3dType)].includes(params.model3d.url as Model3dType);

  // TODO Maybe this options should be the same as for the actor. But actor doesn't have them yet (refactoring is needed)
  const options = {
    shouldSaveToRegistry: params.model3d.options?.shouldSaveToRegistry ?? true,
    shouldAddToScene: params.model3d.options?.shouldAddToScene ?? false,
    isForce: params.model3d.options?.isForce ?? false
  };
  // TODO AWAIT: could speed up by not awaiting mesh to be build
  const model3dLoadResult: TModel3dLoadResult = isPrimitiveModel3d ? await createActorModel3d(params, { materialTextureService }) : await models3dService.loadAsync({ ...params.model3d, options });
  const entity: Mesh | Group = model3dLoadResult.model;

  const withMaterialEntity: TWithMaterial = withMaterial(entity);

  const { value$: position$, update: updatePosition } = withReactivePosition(entity);
  const { value$: rotation$, update: updateRotation } = withReactiveRotation(entity);

  const actorW: TActorWrapperAsync = {
    ...AbstractWrapper(entity, WrapperType.Actor, params),
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...scalableMixin(entity),
    ...withObject3d(entity),
    ...withMaterialEntity,
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
