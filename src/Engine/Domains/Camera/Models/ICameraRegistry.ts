import type { ICameraWrapper } from '@Engine/Domains/Camera/Models';
import type { IAbstractRegistry, IProtectedRegistry } from '@Engine/Models';

export type ICameraRegistry = IProtectedRegistry<ICameraWrapper, IAbstractRegistry<ICameraWrapper>>;
