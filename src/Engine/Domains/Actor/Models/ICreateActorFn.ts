import type { ICreateFN } from '@Engine/Domains/Abstract';
import type { IActorParams, IActorWrapper } from '@Engine/Domains/Actor';

export type ICreateActorFn = ICreateFN<IActorWrapper, IActorParams>;
