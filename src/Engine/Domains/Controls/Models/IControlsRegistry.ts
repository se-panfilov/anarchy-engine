import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@Engine/Mixins';

import type { IControlsWrapper } from './IControlsWrapper';

export type IControlsRegistry = IProtectedRegistry<IControlsWrapper, IAbstractRegistry<IControlsWrapper>>;
