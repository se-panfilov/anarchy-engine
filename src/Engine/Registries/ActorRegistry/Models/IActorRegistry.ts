import type { AbstractRegistry } from '@Engine/Registries';
import type { ActorWrapper } from '@Engine/Wrappers';

export type IActorRegistry = ReturnType<typeof AbstractRegistry<ReturnType<typeof ActorWrapper>>>;
