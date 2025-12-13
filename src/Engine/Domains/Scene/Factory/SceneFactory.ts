import type { IFactory } from '@Engine/Domains/Abstract';
import { AbstractFactory, withConfigMixin } from '@Engine/Domains/Abstract';

//import { fromConfig } from '../Adapter';
import type { ISceneFactory, ISceneParams, ISceneWrapper } from '../Models';
import { SceneWrapper } from '../Wrapper';

const create = (params: ISceneParams): ISceneWrapper => SceneWrapper(params);
const factory: IFactory<ISceneWrapper, ISceneParams> = { ...AbstractFactory('scene'), create };
export const SceneFactory = (): ISceneFactory => ({ ...factory, ...withConfigMixin(fromConfig) });
