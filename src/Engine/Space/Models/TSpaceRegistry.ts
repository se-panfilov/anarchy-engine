import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TSpace } from './TSpace';

export type TSpaceRegistry = TProtectedRegistry<TAbstractEntityRegistry<TSpace>>;
