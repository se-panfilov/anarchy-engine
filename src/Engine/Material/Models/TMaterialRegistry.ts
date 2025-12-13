import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TMaterialWrapper } from './TMaterialWrapper';

export type TMaterialRegistry = TProtectedRegistry<TAbstractEntityRegistry<TMaterialWrapper>>;
