import { AbstractWrapper } from '@Engine/Domains/Abstract';

import type { IActorParams, IActorWrapper, IMesh } from '../Models';
import { getAccessors } from './Accessors';
import { createActor } from './ActorUtils';

export function ActorWrapper(params: IActorParams): IActorWrapper {
  const entity: IMesh = createActor(params);
  return { ...AbstractWrapper(entity, params), ...getAccessors(entity), entity };
}
