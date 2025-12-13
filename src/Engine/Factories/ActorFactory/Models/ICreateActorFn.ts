import type { CreateFN } from '@Engine/Factories';
import type { ActorWrapper } from '@Engine/Wrappers';
import type { IActorParams } from '@Engine/Models';

export type ICreateActorFn = CreateFN<ReturnType<typeof ActorWrapper>, IActorParams>;
