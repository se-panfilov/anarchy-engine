import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TRendererWrapper } from './TRendererWrapper';

export type TRendererRegistry = TProtectedRegistry<TAbstractEntityRegistry<TRendererWrapper>>;
