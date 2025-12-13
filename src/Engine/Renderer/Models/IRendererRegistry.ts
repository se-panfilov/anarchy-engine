import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TRendererWrapper } from './TRendererWrapper';

export type IRendererRegistry = TProtectedRegistry<TAbstractEntityRegistry<TRendererWrapper>>;
