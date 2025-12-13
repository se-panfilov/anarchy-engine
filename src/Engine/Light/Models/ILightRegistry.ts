import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract/Models';
import type { IAbstractLightWrapper, ILight } from '@/Engine/Light/Models';

export type ILightRegistry = IProtectedRegistry<IAbstractEntityRegistry<IAbstractLightWrapper<ILight>>>;
