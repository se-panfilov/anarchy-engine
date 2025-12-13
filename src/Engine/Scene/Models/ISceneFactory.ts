import type { IParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { ISceneConfig } from './ISceneConfig';
import type { ISceneParams } from './ISceneParams';
import type { TSceneWrapper } from './TSceneWrapper';

export type ISceneFactory = TReactiveFactory<TSceneWrapper, ISceneParams> & IParamsFromConfig<ISceneConfig, ISceneParams> & TDestroyable;
