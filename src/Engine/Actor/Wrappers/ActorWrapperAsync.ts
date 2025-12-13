import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TActorDependencies, TActorParams, TActorWrapperAsync } from '@/Engine/Actor/Models';
import type { TWithMaterial } from '@/Engine/Material';
import { withMaterial } from '@/Engine/Material';
import { scalableMixin, withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import { withTextures } from '@/Engine/Texture';
import type { TMesh } from '@/Engine/ThreeLib';
import { applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

import { createActorMesh } from './ActorUtils';

export async function ActorWrapperAsync(params: TActorParams, { materialTextureService }: TActorDependencies): Promise<TActorWrapperAsync> {
  // TODO (S.Panfilov) AWAIT: could speed up by not awaiting mesh to be build
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const entity: TMesh = await createActorMesh(params, { materialTextureService });

  const withMaterialEntity: TWithMaterial = withMaterial(entity);

  const result = {
    ...AbstractWrapper(entity, WrapperType.Actor, params),
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...scalableMixin(entity),
    ...withObject3d(entity),
    ...withMaterialEntity,
    ...withTextures(withMaterialEntity, materialTextureService),
    entity
  };

  applyPosition(result, params.position);
  applyRotation(result, params.rotation);
  if (isDefined(params.scale)) applyScale(result, params.scale);
  applyObject3dParams(result, params);

  return result;
}
