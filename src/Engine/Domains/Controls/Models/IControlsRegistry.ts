import type { IAbstractRegistry, IProtectedRegistry } from '@/Engine/Domains/Abstract';

import type { IOrbitControlsWrapper } from './IOrbitControlsWrapper';

export type IControlsRegistry = IProtectedRegistry<IOrbitControlsWrapper, IAbstractRegistry<IOrbitControlsWrapper>>;
