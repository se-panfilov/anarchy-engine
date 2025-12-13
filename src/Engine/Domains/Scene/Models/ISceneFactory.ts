import type { IScene, ISceneConfig, ISceneParams, ISceneWrapper } from '@Engine/Domains/Scene/Models';
import type { IAbstractFromConfigWrapperFactory } from '@Engine/Models';

export type ISceneFactory = IAbstractFromConfigWrapperFactory<ISceneWrapper, IScene, ISceneParams, ISceneConfig>;
