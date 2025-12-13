import type { IAbstractRegistry } from '@/Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@/Engine/Mixins';

import type { ISceneWrapper } from './ISceneWrapper';

export type ISceneRegistry = IProtectedRegistry<ISceneWrapper, IAbstractRegistry<ISceneWrapper>>;
