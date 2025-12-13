import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { ICameraWrapper } from '@Engine/Domains/Camera';
import type { IProtectedRegistry } from '@Engine/Mixins';

export type ICameraRegistry = IProtectedRegistry<ICameraWrapper, IAbstractRegistry<ICameraWrapper>>;
