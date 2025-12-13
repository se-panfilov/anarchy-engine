import type { IAbstractRegistry, IProtectedRegistry } from '@/Engine/Domains/Abstract';

import type { ISceneWrapper } from './ISceneWrapper';

export type ISceneRegistry = IProtectedRegistry<ISceneWrapper, IAbstractRegistry<ISceneWrapper>>;
