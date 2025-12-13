import type { IParamsFromConfig, IReactiveFactory } from '@/Engine/Domains/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

import type { ISceneConfig } from './ISceneConfig';
import type { ISceneParams } from './ISceneParams';
import type { ISceneWrapper } from './ISceneWrapper';

export type ISceneFactory = IReactiveFactory<ISceneWrapper, ISceneParams> & IParamsFromConfig<ISceneConfig, ISceneParams> & IDestroyable;
