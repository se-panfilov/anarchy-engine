import type { IAbstractFactory, IAbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';
import type { IActorConfig, IActorParams, IActorWrapper, IMesh } from '@Engine/Domains/Actor';

export type IActorFactory = IAbstractFromConfigWrapperFactory<IActorWrapper, IMesh, IActorParams, IActorConfig, IAbstractFactory<IActorWrapper, IActorParams>>;
