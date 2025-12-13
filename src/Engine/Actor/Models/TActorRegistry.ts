import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TActor } from './TActor';

export type TActorRegistry = TProtectedRegistry<TAbstractEntityRegistry<TActor>>;
