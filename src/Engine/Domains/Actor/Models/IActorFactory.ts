import type { IActorConfig, IActorParams, IActorWrapper, IMesh } from '@Engine/Domains/Actor/Models';
import type { IAbstractFromConfigWrapperFactory } from '@Engine/Models';

export type IActorFactory = IAbstractFromConfigWrapperFactory<IActorWrapper, IMesh, IActorParams, IActorConfig>;
