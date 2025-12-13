import type { IAbstractAsyncRegistry, IProtectedAsyncRegistry } from '@/Engine/Abstract';

import type { IActorWrapper } from './IActorWrapper';

export type IActorAsyncRegistry = IProtectedAsyncRegistry<IActorWrapper, IAbstractAsyncRegistry<IActorWrapper>>;
