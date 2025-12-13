import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract/Models';

import type { IRendererWrapper } from './IRendererWrapper';

export type IRendererRegistry = IProtectedRegistry<IAbstractEntityRegistry<IRendererWrapper>>;
