import type { IFactory, IFromConfig } from '@Engine/Domains/Abstract';

import type { ISceneConfig } from './ISceneConfig';
import type { ISceneParams } from './ISceneParams';
import type { ISceneWrapper } from './ISceneWrapper';

export type ISceneFactory = IFactory<ISceneWrapper, ISceneParams> & IFromConfig<ISceneConfig, ISceneParams>;
