import type { IAbstractFactory, IAbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';
import type { IScene, ISceneConfig, ISceneParams, ISceneWrapper } from '@Engine/Domains/Scene';

export type ISceneFactory = IAbstractFromConfigWrapperFactory<ISceneWrapper, IScene, ISceneParams, ISceneConfig, IAbstractFactory<ISceneWrapper, ISceneParams>>;
