import type { IAbstractFromConfigWrapperFactory } from '@Engine/Models';
import type { IActorConfig, IMesh, IActorParams, IActorWrapper } from '@Engine/Domains/Actor/Models';

export type IActorFactory = IAbstractFromConfigWrapperFactory<IActorWrapper, IMesh, IActorParams, IActorConfig>;
