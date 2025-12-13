import type { IAbstractFactory, IAbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';

import type { IScene } from './IScene';
import type { ISceneConfig } from './ISceneConfig';
import type { ISceneParams } from './ISceneParams';
import type { ISceneWrapper } from './ISceneWrapper';

export type ISceneFactory = IAbstractFromConfigWrapperFactory<ISceneWrapper, IScene, ISceneParams, ISceneConfig, IAbstractFactory<ISceneWrapper, ISceneParams>>;
