import type { IFactory, IScene, ISceneParams } from '@Engine/Models';
import type { ISceneWrapper } from '@Engine/Wrappers';
import type { ISceneConfig } from '@Engine/Launcher/Models';

export type ISceneFactory = IFactory<ISceneWrapper, IScene, ISceneParams, ISceneConfig>;
