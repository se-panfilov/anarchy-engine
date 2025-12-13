import { AbstractAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IActorAsyncRegistry, IActorWrapper } from '@/Engine/Actor/Models';

export const ActorAsyncRegistry = (): IActorAsyncRegistry => RegistryFacade(AbstractAsyncRegistry<IActorWrapper>(RegistryType.Actor));
