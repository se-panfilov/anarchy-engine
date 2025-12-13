import { AbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';
import type { ICreateSceneFn, ISceneFactory, ISceneParams, ISceneWrapper } from '@Engine/Domains/Scene';
import { SceneWrapper } from '@Engine/Domains/Scene';

const create: ICreateSceneFn = (params: ISceneParams): ISceneWrapper => SceneWrapper(params);
export const SceneFactory = (): ISceneFactory => AbstractFromConfigWrapperFactory('scene', create);
