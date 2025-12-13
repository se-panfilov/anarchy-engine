import { AbstractEntityRegistry, RegistryType } from '@Engine/Abstract';
import type { TActor, TActorRegistry } from '@Engine/Actor/Models';

export function ActorRegistry(): TActorRegistry {
  return AbstractEntityRegistry<TActor>(RegistryType.Actor);
}
