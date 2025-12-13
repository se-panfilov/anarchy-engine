import type { IActorWrapper } from '@Engine/Domains/Actor/Models';
import type { IAbstractRegistry, IProtectedRegistry } from '@Engine/Models';

export type IActorRegistry = IProtectedRegistry<IActorWrapper, IAbstractRegistry<IActorWrapper>>;
