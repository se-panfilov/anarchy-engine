import type { ILightWrapper } from '@Engine/Wrappers';
import type { IAbstractRegistry, IProtectedRegistry } from '@Engine/Models';

export type ILightRegistry = IProtectedRegistry<ILightWrapper, IAbstractRegistry<ILightWrapper>>;
