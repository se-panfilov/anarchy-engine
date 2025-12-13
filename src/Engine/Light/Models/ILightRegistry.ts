import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';
import type { IAbstractLightWrapper, ILight } from '@/Engine/Light/Models';

export type ILightRegistry = TProtectedRegistry<TAbstractEntityRegistry<IAbstractLightWrapper<ILight>>>;
