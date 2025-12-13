import type { ICreateSceneFn, ISceneFactory } from './Models';
import { AbstractFactory } from '../AbstractFactory';
import type { ISceneWrapper } from '@Engine/Wrappers';
import { SceneWrapper } from '@Engine/Wrappers';
import type { SceneParams } from '@Engine/Models';

const create: ICreateSceneFn = (params: SceneParams): ISceneWrapper => SceneWrapper(params);
export const SceneFactory = (): ISceneFactory => AbstractFactory('scene', create);
