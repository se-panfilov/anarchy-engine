import type { IScene, ISceneConfig, ISceneParams, ISceneWrapper } from '@Engine/Domains/Scene/Models';
import type { IAbstractFactory, IAbstractFromConfigWrapperFactory } from '@Engine/Models';

export type ISceneFactory = IAbstractFromConfigWrapperFactory<ISceneWrapper, IScene, ISceneParams, ISceneConfig, IAbstractFactory<ISceneWrapper, ISceneParams>>;
