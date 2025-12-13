import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract/Models';

import type { ISceneWrapper } from './ISceneWrapper';

export type ISceneRegistry = IProtectedRegistry<IAbstractEntityRegistry<ISceneWrapper>>;
