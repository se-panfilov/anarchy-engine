import { ActorWrapper } from '@Engine/Wrappers/ActorWrapper';
import { AbstractFactory } from '@Engine/Managers/AbstractFactory';
import type { Factory } from '@Engine/Models/Factory';
import type { ActorParams } from '@Engine/Models/ActorParams';

export function ActorFactory(): Factory<ActorWrapper, ActorParams> {
  return AbstractFactory(create);
}

function create(params: ActorParams): ActorWrapper {
  return ActorWrapper(params);
}
