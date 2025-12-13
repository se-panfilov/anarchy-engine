import { AbstractRegistry, RegistryFacade } from '@/Engine/Domains/Abstract';
import type { IActorRegistry, IActorWrapper } from '@/Engine/Domains/Actor/Models';
import { RegistryType } from '@/Engine/Registries';

export const ActorRegistry = (): IActorRegistry => RegistryFacade(AbstractRegistry<IActorWrapper>(RegistryType.Actor));
