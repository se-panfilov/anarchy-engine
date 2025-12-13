import type { IAbstractFromConfigWrapperFactory, IScene, ISceneConfig, ISceneParams } from '@Engine/Models';
import type { ISceneWrapper } from '@Engine/Wrappers';

export type ISceneFactory = IAbstractFromConfigWrapperFactory<ISceneWrapper, IScene, ISceneParams, ISceneConfig>;
