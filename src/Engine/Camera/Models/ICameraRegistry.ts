import type { IAbstractRegistry, IProtectedRegistry } from '@/Engine/Abstract';

import type { ICameraWrapper } from './ICameraWrapper';

export type ICameraRegistry = IProtectedRegistry<ICameraWrapper, IAbstractRegistry<ICameraWrapper>>;
