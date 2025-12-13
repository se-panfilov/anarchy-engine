import type { IAbstractRegistry } from '@Engine/Domains/Abstract';

import type { IProtectedRegistry } from '@/Engine/Mixins';

import type { ICameraWrapper } from './ICameraWrapper';

export type ICameraRegistry = IProtectedRegistry<ICameraWrapper, IAbstractRegistry<ICameraWrapper>>;
