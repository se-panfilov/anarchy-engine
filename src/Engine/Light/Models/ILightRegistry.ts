import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract';
import type { IAbstractLightWrapper } from '@/Engine/Light/Models';

export type ILightRegistry = IProtectedRegistry<IAbstractEntityRegistry<IAbstractLightWrapper>>;
