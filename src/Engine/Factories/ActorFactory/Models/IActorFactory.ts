import type { IAbstractFromConfigFactory, IActorConfig, IActorParams, IMesh } from '@Engine/Models';
import type { IActorWrapper } from '@Engine/Wrappers/ActorWrapper';

export type IActorFactory = IAbstractFromConfigFactory<IActorWrapper, IMesh, IActorParams, IActorConfig>;
