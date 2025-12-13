import type { IAbstractRegistry, IProtectedRegistry } from '@/Engine/Domains/Abstract';

import type { ICameraWrapper } from './ICameraWrapper';

export type ICameraRegistry = IProtectedRegistry<ICameraWrapper, IAbstractRegistry<ICameraWrapper>>;
