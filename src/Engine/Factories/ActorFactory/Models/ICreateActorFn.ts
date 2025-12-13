import type { CreateFN } from '@Engine/Factories';
import type { ActorWrapper } from '@Engine/Wrappers';
import type { ActorParams } from '@Engine/Models';

export type ICreateActorFn = CreateFN<ReturnType<typeof ActorWrapper>, ActorParams>;
