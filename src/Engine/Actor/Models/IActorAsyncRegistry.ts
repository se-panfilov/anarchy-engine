import type { IAbstractAsyncRegistry, IProtectedRegistry } from '@/Engine/Abstract';

import type { IActorWrapper } from './IActorWrapper';

export type IActorAsyncRegistry = IProtectedRegistry<IActorWrapper, IAbstractAsyncRegistry<IActorWrapper>>;
