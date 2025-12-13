import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { IActorParams, IActorWrapper, IMesh } from '@/Engine/Domains/Actor/Models';

import { getAccessors } from './Accessors';
import { createActor } from './ActorUtils';

export function ActorWrapper(params: IActorParams): IActorWrapper {
  const entity: IMesh = createActor(params);
  return { ...AbstractWrapper(entity, WrapperType.Actor, params), ...getAccessors(entity), entity };
}
