import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TActorWrapper } from './TActorWrapper';

export type TActorRegistry = TProtectedRegistry<TAbstractEntityRegistry<TActorWrapper>>;
