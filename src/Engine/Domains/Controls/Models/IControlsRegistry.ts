import type { IAbstractRegistry, IProtectedRegistry } from '@Engine/Domains/Abstract';

import type { IControlsWrapper } from './IControlsWrapper';

export type IControlsRegistry = IProtectedRegistry<IControlsWrapper, IAbstractRegistry<IControlsWrapper>>;
