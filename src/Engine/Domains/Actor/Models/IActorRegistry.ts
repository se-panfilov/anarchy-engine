import type { IActorWrapper } from '@Engine/Domains/Actor/Models';
import type { IProtectedRegistry } from '@Engine/Models';

export type IActorRegistry = IProtectedRegistry<IActorWrapper>;
