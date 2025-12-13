import type { IFactory } from '@Engine/Domains/Abstract';

import type { ISceneParams } from './ISceneParams';
import type { ISceneWrapper } from './ISceneWrapper';

export type ISceneFactory = IFactory<ISceneWrapper, ISceneParams>;
