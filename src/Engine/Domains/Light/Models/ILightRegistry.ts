import type { IAbstractRegistry, IProtectedRegistry } from '@Engine/Domains/Abstract';

import type { ILightWrapper } from '../Models';

export type ILightRegistry = IProtectedRegistry<ILightWrapper, IAbstractRegistry<ILightWrapper>>;
