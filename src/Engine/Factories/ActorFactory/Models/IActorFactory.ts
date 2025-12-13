import type { IAbstractFromConfigWrapperFactory, IActorConfig, IActorParams, IMesh } from '@Engine/Models';
import type { IActorWrapper } from '@Engine/Wrappers/ActorWrapper';

export type IActorFactory = IAbstractFromConfigWrapperFactory<IActorWrapper, IMesh, IActorParams, IActorConfig>;
