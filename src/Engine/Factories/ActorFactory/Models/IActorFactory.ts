import type { IActorConfig, IActorParams, IFactory, IMesh } from '@Engine/Models';
import type { IActorWrapper } from '@Engine/Wrappers/ActorWrapper';

export type IActorFactory = IFactory<IActorWrapper, IMesh, IActorParams, IActorConfig>;
