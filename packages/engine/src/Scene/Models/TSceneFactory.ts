import type { TParamsFromConfig, TReactiveFactory } from '@Engine/Abstract';

import type { TSceneConfig } from './TSceneConfig';
import type { TSceneParams } from './TSceneParams';
import type { TSceneWrapper } from './TSceneWrapper';

export type TSceneFactory = TReactiveFactory<TSceneWrapper, TSceneParams> & TParamsFromConfig<TSceneConfig, TSceneParams>;
