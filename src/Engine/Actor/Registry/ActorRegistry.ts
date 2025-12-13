import { AbstractRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IActorRegistry, IActorWrapper } from '@/Engine/Actor/Models';

export const ActorRegistry = (): IActorRegistry => RegistryFacade(AbstractRegistry<IActorWrapper>(RegistryType.Actor));
