import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { ReactiveFactory } from '@Engine/Domains/Abstract';

import { getParams } from '../Adapter';
import type { ISceneFactory, ISceneParams, ISceneWrapper } from '../Models';
import { SceneWrapper } from '../Wrapper';

const factory: IReactiveFactory<ISceneWrapper, ISceneParams> = { ...ReactiveFactory('scene', SceneWrapper) };
export const SceneFactory = (): ISceneFactory => ({ ...factory, getParams });
