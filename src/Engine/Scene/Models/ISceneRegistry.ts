import type { IAbstractRegistry, IProtectedRegistry } from '@/Engine/Abstract';

import type { ISceneWrapper } from './ISceneWrapper';

export type ISceneRegistry = IProtectedRegistry<IAbstractRegistry<ISceneWrapper>>;
