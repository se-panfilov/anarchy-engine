import type { Subscription } from 'rxjs';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TActorDependencies, TActorParams, TActorWrapperAsync } from '@/Engine/Actor/Models';
import { withKinematic } from '@/Engine/Kinematic';
import type { TWithMaterial } from '@/Engine/Material';
import { withMaterial } from '@/Engine/Material';
import { scalableMixin, withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import type { TSpatialLoopServiceValue } from '@/Engine/Spatial';
import { withReactivePosition, withReactiveRotation } from '@/Engine/Spatial';
import { withSpatial } from '@/Engine/Spatial/Mixins/WithSpatial';
import { withTextures } from '@/Engine/Texture';
import type { TMesh } from '@/Engine/ThreeLib';
import { applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

import { createActorMesh } from './ActorUtils';

export async function ActorWrapperAsync(params: TActorParams, { materialTextureService, kinematicLoopService, spatialLoopService }: TActorDependencies): Promise<TActorWrapperAsync> {
  // TODO (S.Panfilov) AWAIT: could speed up by not awaiting mesh to be build
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const entity: TMesh = await createActorMesh(params, { materialTextureService });

  const withMaterialEntity: TWithMaterial = withMaterial(entity);

  const { value$: position$, update: updatePosition } = withReactivePosition(entity);
  const { value$: rotation$, update: updateRotation } = withReactiveRotation(entity);

  // TODO (S.Panfilov) debug
  //WIP: position subject
  // position$.subscribe((newPosition) => {
  //   if (actorW.getName() === 'sphere') console.log(`Position changed to: x=${newPosition.x}, y=${newPosition.y}, z=${newPosition.z}`);
  // });
  //END WIP: position subject

  const actorW = {
    ...AbstractWrapper(entity, WrapperType.Actor, params),
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...scalableMixin(entity),
    ...withObject3d(entity),
    ...withMaterialEntity,
    ...withTextures(withMaterialEntity, materialTextureService),
    ...withKinematic(params),
    ...withSpatial(params),
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
  });

  applyPosition(actorW, params.position);
  // TODO (S.Panfilov) CWP Should be guaranteed that spatial grid is build before in Space
  // applySpatialGrid(actorW);
  applyRotation(actorW, params.rotation);
  if (isDefined(params.scale)) applyScale(actorW, params.scale);
  applyObject3dParams(actorW, params);

  return actorW;
}
