import type { ICreateSceneFn, ISceneFactory, ISceneParams, ISceneWrapper } from '@Engine/Domains/Scene/Models';
import { SceneWrapper } from '@Engine/Domains/Scene/Wrapper';
import { AbstractFromConfigWrapperFactory } from '@Engine/Factories';

const create: ICreateSceneFn = (params: ISceneParams): ISceneWrapper => SceneWrapper(params);
export const SceneFactory = (): ISceneFactory => AbstractFromConfigWrapperFactory('scene', create);
