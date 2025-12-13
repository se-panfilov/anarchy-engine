import { AbstractEntityRegistry, RegistryType } from '@/Engine/Abstract';
import type { TActor, TActorRegistry } from '@/Engine/Actor/Models';

export const ActorRegistry = (): TActorRegistry => AbstractEntityRegistry<TActor>(RegistryType.Actor);
