import type { IActorParams, IMesh } from '@Engine/Models';
import { AbstractWrapper } from '@Engine/Wrappers';

import { getAccessors } from './Accessors';
import { createActor } from './ActorUtils';
import type { IActorWrapper } from './Models';

export function ActorWrapper(params: IActorParams): IActorWrapper {
  const entity: IMesh = createActor(params);
  return { ...AbstractWrapper(entity, params), ...getAccessors(entity), entity };
}
