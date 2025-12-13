import { AbstractWrapper } from '@Engine/Wrappers';
import type { ActorParams } from '@Engine/Models';
import { createActor } from './ActorUtils';
import { getAccessors } from './Accessors';
import type { Mesh } from 'three';
import type { IActorWrapper } from './Models';

export function ActorWrapper(params: ActorParams): IActorWrapper {
  const entity: Mesh = createActor(params);
  return { ...AbstractWrapper(entity), ...getAccessors(entity), entity };
}
