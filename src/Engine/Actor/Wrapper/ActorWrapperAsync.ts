import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { IActorParams, IActorWrapper, IMesh } from '@/Engine/Actor/Models';
import { withMaterialActor } from '@/Engine/Material';
import { scalableMixin, withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import { withTexturesActor } from '@/Engine/Texture';
import { applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

import { createActor } from './ActorUtils';

export async function ActorWrapperAsync(params: IActorParams): Promise<IActorWrapper> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const entity: IMesh = await createActor(params);

  const withMaterialEntity = withMaterialActor(entity);

  const result = {
    ...AbstractWrapper(entity, WrapperType.Actor, params),
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...scalableMixin(entity),
    ...withObject3d(entity),
    ...withMaterialEntity,
    ...withTexturesActor(withMaterialEntity),
    entity
  };

  applyPosition(result, params.position);
  applyRotation(result, params.rotation);
  if (isDefined(params.scale)) applyScale(result, params.scale);
  applyObject3dParams(result, params);

  return result;
}
