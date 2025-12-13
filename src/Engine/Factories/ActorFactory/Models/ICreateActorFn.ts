import type { ICreateFN } from '@Engine/Factories';
import type { IActorParams } from '@Engine/Models';
import type { IActorWrapper } from '@Engine/Wrappers';

export type ICreateActorFn = ICreateFN<IActorWrapper, IActorParams>;
