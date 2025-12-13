import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@Engine/Mixins';

import type { ILightWrapper } from '../Models';

export type ILightRegistry = IProtectedRegistry<ILightWrapper, IAbstractRegistry<ILightWrapper>>;
