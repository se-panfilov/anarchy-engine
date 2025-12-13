import type { IActorParams, IActorWrapper } from '@Engine/Domains/Actor/Models';
import type { ICreateFN } from '@Engine/Factories';

export type ICreateActorFn = ICreateFN<IActorWrapper, IActorParams>;
