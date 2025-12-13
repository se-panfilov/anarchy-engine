import type { Mesh } from 'three';
import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';
import type { ActorParams } from '@Engine/Models';
import { createActor } from './ActorUtils';
import { getAccessors } from './Accessors';

type IActorWrapper = ReturnType<typeof AbstractWrapper<Mesh>> & ReturnType<typeof getAccessors>;

export function ActorWrapper(params: ActorParams): IActorWrapper {
  const entity: Mesh = createActor(params);
  return { ...AbstractWrapper(entity), ...getAccessors(entity), entity };
}
