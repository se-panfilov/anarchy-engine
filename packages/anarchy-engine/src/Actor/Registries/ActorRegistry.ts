import { AbstractEntityRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TActor, TActorRegistry } from '@hellpig/anarchy-engine/Actor/Models';

export function ActorRegistry(): TActorRegistry {
  return AbstractEntityRegistry<TActor>(RegistryType.Actor);
}
