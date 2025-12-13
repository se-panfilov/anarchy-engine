import type { IAbstractRegistry, IProtectedRegistry } from '@/Engine/Abstract';
import type { ILightWrapper } from '@/Engine/Light/Models';

export type ILightRegistry = IProtectedRegistry<ILightWrapper, IAbstractRegistry<ILightWrapper>>;
