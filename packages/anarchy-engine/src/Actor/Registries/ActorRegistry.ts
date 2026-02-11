import { AbstractEntityRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TActor, TActorRegistry } from '@Anarchy/Engine/Actor/Models';

export function ActorRegistry(): TActorRegistry {
  return AbstractEntityRegistry<TActor>(RegistryType.Actor);
}
