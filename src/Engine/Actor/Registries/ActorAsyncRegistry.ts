import { AbstractAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IActorAsyncRegistry, IActorWrapperAsync } from '@/Engine/Actor/Models';

export const ActorAsyncRegistry = (): IActorAsyncRegistry => RegistryFacade(AbstractAsyncRegistry<IActorWrapperAsync>(RegistryType.Actor));
