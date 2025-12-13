import type { IFactory } from '@Engine/Domains/Abstract';
import { AbstractFactory, withConfigFactoryMixin } from '@Engine/Domains/Abstract';

import type { ISceneFactory, ISceneParams, ISceneWrapper } from '../Models';
import { SceneWrapper } from '../Wrapper';

const create = (params: ISceneParams): ISceneWrapper => SceneWrapper(params);
const factory: IFactory<ISceneWrapper, ISceneParams> = { ...AbstractFactory('scene'), create };
export const SceneFactory = (): ISceneFactory => withConfigFactoryMixin(factory);
