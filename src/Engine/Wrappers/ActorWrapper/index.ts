import type { Mesh } from 'three';
import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';
import type { ActorParams } from '@Engine/Models/ActorParams';
import { createActor } from './ActorUtils';
import { getActorAccessors } from '@Engine/Wrappers/ActorWrapper/ActorAccessors';

type IActorWrapper = ReturnType<typeof AbstractWrapper<Mesh>> & ReturnType<typeof getActorAccessors>;

export function ActorWrapper(params: ActorParams): IActorWrapper {
  const entity: Mesh = createActor(params);
  return { ...AbstractWrapper(entity), ...getActorAccessors(entity), entity };
}
