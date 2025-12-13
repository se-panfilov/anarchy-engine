import { AbstractAsyncRegistry, RegistryAsyncFacade, RegistryType } from '@/Engine/Abstract';
import type { IActorAsyncRegistry, IActorWrapper } from '@/Engine/Actor/Models';

export const ActorAsyncRegistry = (): IActorAsyncRegistry => RegistryAsyncFacade(AbstractAsyncRegistry<IActorWrapper>(RegistryType.Actor));
