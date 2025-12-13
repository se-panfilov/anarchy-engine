import type { IAbstractRegistry, IProtectedRegistry } from '@Engine/Models';
import type { IActorWrapper } from '@Engine/Wrappers';

export type IActorRegistry = IProtectedRegistry<IActorWrapper, IAbstractRegistry<IActorWrapper>>;
