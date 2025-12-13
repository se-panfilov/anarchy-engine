import { AbstractEntityRegistry, RegistryType } from '@/Abstract';
import type { TActor, TActorRegistry } from '@/Actor/Models';

export function ActorRegistry(): TActorRegistry {
  return AbstractEntityRegistry<TActor>(RegistryType.Actor);
}
