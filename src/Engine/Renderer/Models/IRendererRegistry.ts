import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { IRendererWrapper } from './IRendererWrapper';

export type IRendererRegistry = TProtectedRegistry<TAbstractEntityRegistry<IRendererWrapper>>;
