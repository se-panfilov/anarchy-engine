import type { IAbstractFromConfigFactory, IScene, ISceneConfig, ISceneParams } from '@Engine/Models';
import type { ISceneWrapper } from '@Engine/Wrappers';

export type ISceneFactory = IAbstractFromConfigFactory<ISceneWrapper, IScene, ISceneParams, ISceneConfig>;
