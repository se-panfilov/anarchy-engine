import type { IActorConfig, IActorParams, IMesh, IAbstractFromConfigFactory } from '@Engine/Models';
import type { IActorWrapper } from '@Engine/Wrappers/ActorWrapper';

export type IActorFactory = IAbstractFromConfigFactory<IActorWrapper, IMesh, IActorParams, IActorConfig>;
