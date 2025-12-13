import { AbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';

import type { ICreateSceneFn, ISceneFactory, ISceneParams, ISceneWrapper } from '../Models';
import { SceneWrapper } from '../Wrapper';

const create: ICreateSceneFn = (params: ISceneParams): ISceneWrapper => SceneWrapper(params);
export const SceneFactory = (): ISceneFactory => AbstractFromConfigWrapperFactory('scene', create);
