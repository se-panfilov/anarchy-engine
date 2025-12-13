import type { IAbstractRegistry } from '@/Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@/Engine/Mixins';

import type { IOrbitControlsWrapper } from './IOrbitControlsWrapper';

export type IControlsRegistry = IProtectedRegistry<IOrbitControlsWrapper, IAbstractRegistry<IOrbitControlsWrapper>>;
