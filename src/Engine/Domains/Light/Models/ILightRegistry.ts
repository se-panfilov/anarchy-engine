import type { IAbstractRegistry, IProtectedRegistry } from '@/Engine/Domains/Abstract';
import type { ILightWrapper } from '@/Engine/Domains/Light/Models';

export type ILightRegistry = IProtectedRegistry<ILightWrapper, IAbstractRegistry<ILightWrapper>>;
