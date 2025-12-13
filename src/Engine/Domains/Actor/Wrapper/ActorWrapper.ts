import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { IActorParams, IActorWrapper, IMesh } from '@/Engine/Domains/Actor/Models';
import { moveableMixin, rotatableMixin, scalableMixin } from '@/Engine/Mixins';
import { withObject3d } from '@/Engine/Mixins/GameObject/WithObject3D';
import { applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

import { createActor } from './ActorUtils';

export function ActorWrapper(params: IActorParams): IActorWrapper {
  const entity: IMesh = createActor(params);

  const result = {
    ...AbstractWrapper(entity, WrapperType.Actor, params),
    ...moveableMixin(entity),
    ...rotatableMixin(entity),
    ...scalableMixin(entity),
    ...withObject3d(entity),
    entity
  };

  applyPosition(params.position, result);
  applyRotation(params.rotation, result);
  if (isDefined(params.scale)) applyScale(params.scale, result);
  applyObject3dParams(params, result);

  return result;
}
