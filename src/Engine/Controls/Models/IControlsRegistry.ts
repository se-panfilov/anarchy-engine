import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract';

import type { IOrbitControlsWrapper } from './IOrbitControlsWrapper';

export type IControlsRegistry = IProtectedRegistry<IAbstractEntityRegistry<IOrbitControlsWrapper>>;
