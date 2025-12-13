import type { IAbstractAsyncRegistry, IProtectedRegistry } from '@/Engine/Abstract';

import type { IActorWrapperAsync } from './IActorWrapperAsync';

export type IActorAsyncRegistry = IProtectedRegistry<IAbstractAsyncRegistry<IActorWrapperAsync>>;
