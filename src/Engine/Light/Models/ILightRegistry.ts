import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract';
import type { IAbstractLightWrapper, ILight } from '@/Engine/Light/Models';

export type ILightRegistry = IProtectedRegistry<IAbstractEntityRegistry<IAbstractLightWrapper<ILight>>>;
