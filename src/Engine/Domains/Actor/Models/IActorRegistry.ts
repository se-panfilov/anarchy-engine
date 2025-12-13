import type { IProtectedRegistry } from '@Engine/Models';
import { IActorWrapper } from '@Engine/Domains/Actor/Models';

export type IActorRegistry = IProtectedRegistry<IActorWrapper>;
