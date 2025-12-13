import type { TParamsFromConfig, TReactiveFactory } from '@Engine/Abstract';

import type { TSpace } from './TSpace';
import type { TSpaceConfig } from './TSpaceConfig';
import type { TSpaceFactoryDependencies } from './TSpaceFactoryDependencies';
import type { TSpaceFlags } from './TSpaceFlags';
import type { TSpaceParams } from './TSpaceParams';

export type TSpaceFactory = TReactiveFactory<TSpace, TSpaceParams, TSpaceFactoryDependencies, TSpaceFlags> & TParamsFromConfig<TSpaceConfig, TSpaceParams>;
