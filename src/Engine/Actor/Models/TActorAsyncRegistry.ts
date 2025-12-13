import type { TAbstractAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TActorWrapperAsync } from './TActorWrapperAsync';

export type TActorAsyncRegistry = TProtectedRegistry<TAbstractAsyncRegistry<TActorWrapperAsync>>;
