import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { ILightWrapper } from '@Engine/Domains/Light';
import type { IProtectedRegistry } from '@Engine/Models';

export type ILightRegistry = IProtectedRegistry<ILightWrapper, IAbstractRegistry<ILightWrapper>>;
