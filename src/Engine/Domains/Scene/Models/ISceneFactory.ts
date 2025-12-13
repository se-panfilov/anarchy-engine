import type { IAbstractFactory } from '@Engine/Domains/Abstract';
import type { IAbstractFromConfigWrapperFactory } from '@Engine/Domains/Mixins';

import type { IScene } from './IScene';
import type { ISceneConfig } from './ISceneConfig';
import type { ISceneParams } from './ISceneParams';
import type { ISceneWrapper } from './ISceneWrapper';

export type ISceneFactory = IAbstractFromConfigWrapperFactory<ISceneWrapper, IScene, ISceneParams, ISceneConfig, IAbstractFactory<ISceneWrapper, ISceneParams>>;
