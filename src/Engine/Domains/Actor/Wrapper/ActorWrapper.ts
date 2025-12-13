import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { IActorParams, IActorWrapper, IMesh } from '@/Engine/Domains/Actor/Models';
import { scalableMixin, withMoveByXyzMixin, withObject3d, withRotationByXyzMixin, withTexturesActor } from '@/Engine/Mixins';
import { applyObject3dParams, applyPosition, applyRotation, applyScale, applyTexturePack, isDefined } from '@/Engine/Utils';

import { createActor } from './ActorUtils';

export function ActorWrapper(params: IActorParams): IActorWrapper {
  const entity: IMesh = createActor(params);

  const result = {
    ...AbstractWrapper(entity, WrapperType.Actor, params),
    ...withMoveByXyzMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...scalableMixin(entity),
    ...withObject3d(entity),
    ...withTexturesActor(entity),
    entity
  };

  applyPosition(result, params.position);
  if (isDefined(params.texturePack)) void applyTexturePack(result, params.texturePack);
  applyRotation(result, params.rotation);
  if (isDefined(params.scale)) applyScale(result, params.scale);
  applyObject3dParams(result, params);

  return result;
}
