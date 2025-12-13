import type { ICreateFN } from '@Engine/Domains/Abstract';

import type { ISceneParams } from './ISceneParams';
import type { ISceneWrapper } from './ISceneWrapper';

export type ICreateSceneFn = ICreateFN<ISceneWrapper, ISceneParams>;
