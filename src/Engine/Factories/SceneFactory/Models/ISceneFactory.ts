import type { IFactory, IScene, ISceneParams } from '@Engine/Models';
import type { ISceneConfig } from '@Engine/SceneLauncher/Models';
import type { ISceneWrapper } from '@Engine/Wrappers';

export type ISceneFactory = IFactory<ISceneWrapper, IScene, ISceneParams, ISceneConfig>;
