import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TAudio3dWrapper } from './TAudio3dWrapper';

export type TAudioRegistry = TProtectedRegistry<TAbstractEntityRegistry<TAudio3dWrapper>>;
