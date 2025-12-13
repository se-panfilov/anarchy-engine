import type { IFactory, IScene, ISceneConfig, ISceneParams } from '@Engine/Models';
import type { ISceneWrapper } from '@Engine/Wrappers';

export type ISceneFactory = IFactory<ISceneWrapper, IScene, ISceneParams, ISceneConfig>;
