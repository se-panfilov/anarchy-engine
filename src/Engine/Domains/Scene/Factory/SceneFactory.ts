import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Domains/Abstract';

import { getParams } from '../Adapter';
import type { ISceneFactory, ISceneParams, ISceneWrapper } from '../Models';
import { SceneWrapper } from '../Wrapper';

const factory: IReactiveFactory<ISceneWrapper, ISceneParams> = { ...ReactiveFactory(FactoryType.Scene, SceneWrapper) };
export const SceneFactory = (): ISceneFactory => ({ ...factory, getParams });
