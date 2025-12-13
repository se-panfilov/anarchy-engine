import type { ISceneParams } from '@Engine/Models';
import type { ISceneWrapper } from '@Engine/Wrappers';
import { SceneWrapper } from '@Engine/Wrappers';

import { AbstractFromConfigWrapperFactory } from '../AbstractFactory';
import type { ICreateSceneFn, ISceneFactory } from './Models';

const create: ICreateSceneFn = (params: ISceneParams): ISceneWrapper => SceneWrapper(params);
export const SceneFactory = (): ISceneFactory => AbstractFromConfigWrapperFactory('scene', create);
