import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract/Models';

import type { IControlsWrapper } from './IControlsWrapper';

export type IControlsRegistry = IProtectedRegistry<IAbstractEntityRegistry<IControlsWrapper>>;
