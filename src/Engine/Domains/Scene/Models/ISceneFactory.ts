import type { IAbstractFromConfigWrapperFactory } from '@Engine/Models';
import type { IScene, ISceneParams, ISceneConfig, ISceneWrapper } from '@Engine/Domains/Scene/Models';

export type ISceneFactory = IAbstractFromConfigWrapperFactory<ISceneWrapper, IScene, ISceneParams, ISceneConfig>;
