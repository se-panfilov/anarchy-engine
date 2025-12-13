import type { Subscription } from 'rxjs';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TActorDependencies, TActorParams, TActorWrapperAsync } from '@/Engine/Actor/Models';
import { withSpatialCell } from '@/Engine/Collisions/Mixins';
import { withKinematic } from '@/Engine/Kinematic';
import type { TWithMaterial } from '@/Engine/Material';
import { withMaterial } from '@/Engine/Material';
import { scalableMixin, withMoveBy3dMixin, withObject3d, withReactivePosition, withReactiveRotation, withRotationByXyzMixin } from '@/Engine/Mixins';
import { withTextures } from '@/Engine/Texture';
import type { TMesh } from '@/Engine/ThreeLib';
import { applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

import { createActorMesh } from './ActorUtils';

export async function ActorWrapperAsync(params: TActorParams, { materialTextureService, kinematicLoopService, spatialLoopService }: TActorDependencies): Promise<TActorWrapperAsync> {
  // TODO (S.Panfilov) AWAIT: could speed up by not awaiting mesh to be build
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const entity: TMesh = await createActorMesh(params, { materialTextureService });

  const withMaterialEntity: TWithMaterial = withMaterial(entity);

  const actorW = {
    ...AbstractWrapper(entity, WrapperType.Actor, params),
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...scalableMixin(entity),
    ...withObject3d(entity),
    ...withMaterialEntity,
    ...withTextures(withMaterialEntity, materialTextureService),
    ...withKinematic(params),
    ...withSpatialCell(),
    entity
  };

  const kinematicSub$: Subscription = kinematicLoopService.tick$.subscribe((delta: number): void => {
    if (!actorW.kinematic.isAutoUpdate()) return;
    actorW.doKinematicMove(delta);
    actorW.doKinematicRotation(delta);
  });

  const spatialSub$: Subscription = spatialLoopService.tick$.subscribe(({ delta, priority }): void => {
    if (!actorW.spatial.isAutoUpdate()) return;
    updatePosition(priority);
    updateRotation(priority);
  });

  actorW.destroyed$.subscribe(() => {
    kinematicSub$.unsubscribe();
    spatialSub$.unsubscribe();
    positionWatchStop();
    rotationWatchStop();
  });

  applyPosition(actorW, params.position);
  applyRotation(actorW, params.rotation);
  if (isDefined(params.scale)) applyScale(actorW, params.scale);
  applyObject3dParams(actorW, params);

  return actorW;
}
