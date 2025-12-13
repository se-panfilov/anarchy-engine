import { AbstractFactory, CreateFN } from './AbstractFactory';
import { SceneWrapper } from '@Engine/Wrappers';
import type { ISceneWrapper } from '@Engine/Wrappers';
import type { Factory, SceneParams } from '@Engine/Models';
import type { Scene } from 'three';

export type ICreateSceneFn = CreateFN<ReturnType<typeof SceneWrapper>, SceneParams>;
const create: ICreateSceneFn = (params: SceneParams): ReturnType<typeof SceneWrapper> => SceneWrapper(params);

export type ISceneFactory = Factory<ISceneWrapper, Scene, SceneParams>;
export const SceneFactory = (): ISceneFactory => AbstractFactory('scene', create);
