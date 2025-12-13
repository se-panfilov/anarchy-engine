import type { ICreateFN } from '@Engine/Factories';
import type { ActorWrapper } from '@Engine/Wrappers';
import type { IActorParams } from '@Engine/Models';

export type ICreateActorFn = ICreateFN<ReturnType<typeof ActorWrapper>, IActorParams>;
