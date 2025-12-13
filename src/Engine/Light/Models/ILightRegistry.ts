import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract';
import type { ILightWrapper } from '@/Engine/Light/Models';

export type ILightRegistry = IProtectedRegistry<IAbstractEntityRegistry<ILightWrapper>>;
