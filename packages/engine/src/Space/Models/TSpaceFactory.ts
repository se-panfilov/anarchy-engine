import type { TParamsFromConfig, TReactiveFactory } from '@Engine/Abstract';

import type { TSpace } from './TSpace';
import type { TSpaceConfig } from './TSpaceConfig';
import type { TSpaceFactoryDependencies } from './TSpaceFactoryDependencies';
import type { TSpaceParams } from './TSpaceParams';
import type { TSpaceSettings } from './TSpaceSettings';

export type TSpaceFactory = TReactiveFactory<TSpace, TSpaceParams, TSpaceFactoryDependencies, TSpaceSettings> & TParamsFromConfig<TSpaceConfig, TSpaceParams>;
