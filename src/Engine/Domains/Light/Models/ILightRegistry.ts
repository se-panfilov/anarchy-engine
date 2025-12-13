import type { IAbstractRegistry } from '@/Engine/Domains/Abstract';
import type { ILightWrapper } from '@/Engine/Domains/Light/Models';
import type { IProtectedRegistry } from '@/Engine/Mixins';

export type ILightRegistry = IProtectedRegistry<ILightWrapper, IAbstractRegistry<ILightWrapper>>;
