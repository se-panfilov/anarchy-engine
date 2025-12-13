import type { ILightWrapper } from '@Engine/Domains/Light/Models';
import type { IAbstractRegistry, IProtectedRegistry } from '@Engine/Models';

export type ILightRegistry = IProtectedRegistry<ILightWrapper, IAbstractRegistry<ILightWrapper>>;
