import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';

import type { TCameraConfig } from './TCameraConfig';
import type { TCameraParams } from './TCameraParams';
import type { TCameraWrapper } from './TCameraWrapper';

export type TCameraFactory = TReactiveFactory<TCameraWrapper, TCameraParams> & TParamsFromConfig<TCameraConfig, TCameraParams>;
