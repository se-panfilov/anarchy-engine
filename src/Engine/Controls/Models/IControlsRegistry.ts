import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract';

import type { IControlsWrapper } from './IControlsWrapper';

export type IControlsRegistry = IProtectedRegistry<IAbstractEntityRegistry<IControlsWrapper>>;
