import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract';

import type { ISceneWrapper } from './ISceneWrapper';

export type ISceneRegistry = IProtectedRegistry<IAbstractEntityRegistry<ISceneWrapper>>;
