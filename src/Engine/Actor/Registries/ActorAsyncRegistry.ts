import { AbstractAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TActorAsyncRegistry, TActorWrapperAsync } from '@/Engine/Actor/Models';

export const ActorAsyncRegistry = (): TActorAsyncRegistry => RegistryFacade(AbstractAsyncRegistry<TActorWrapperAsync>(RegistryType.Actor));
