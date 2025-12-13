import type { IActorConfig, IActorParams, IActorWrapper, IMesh } from '@Engine/Domains/Actor/Models';
import type { IAbstractFactory, IAbstractFromConfigWrapperFactory } from '@Engine/Models';

export type IActorFactory = IAbstractFromConfigWrapperFactory<IActorWrapper, IMesh, IActorParams, IActorConfig, IAbstractFactory<IActorWrapper, IActorParams>>;
