import type { IActorParams, IActorWrapper, IMesh } from '@Engine/Domains/Actor/Models';
import { AbstractWrapper } from '@Engine/Wrappers';

import { getAccessors } from './Accessors';
import { createActor } from './ActorUtils';

export function ActorWrapper(params: IActorParams): IActorWrapper {
  const entity: IMesh = createActor(params);
  return { ...AbstractWrapper(entity, params), ...getAccessors(entity), entity };
}
