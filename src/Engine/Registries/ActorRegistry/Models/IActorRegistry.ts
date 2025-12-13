import type { IActorWrapper } from '@Engine/Wrappers';
import type { IProtectedRegistry } from '@Engine/Models';
import type { IAbstractRegistry } from '@Engine/Models';

export type IActorRegistry = IProtectedRegistry<IActorWrapper, IAbstractRegistry<IActorWrapper>>;
