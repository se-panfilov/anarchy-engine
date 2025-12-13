import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';

import type { TSpace } from './TSpace';
import type { TSpaceConfig } from './TSpaceConfig';
import type { TSpaceParams } from './TSpaceParams';

export type TSpaceFactory = TReactiveFactory<TSpace, TSpaceParams> & TParamsFromConfig<TSpaceConfig, TSpaceParams>;
