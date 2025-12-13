import type { ICreateFN } from '@Engine/Factories';
import type { IActorWrapper, IActorParams } from '@Engine/Domains/Actor/Models';

export type ICreateActorFn = ICreateFN<IActorWrapper, IActorParams>;
