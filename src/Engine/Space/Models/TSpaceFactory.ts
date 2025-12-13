import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';

import type { TSpace } from './TSpace';
import type { TSpaceConfig } from './TSpaceConfig';
import type { TSpaceConfigAsDependency } from './TSpaceConfigAsDependency';
import type { TSpaceHooks } from './TSpaceHooks';
import type { TSpaceParams } from './TSpaceParams';

export type TSpaceFactory = TReactiveFactory<TSpace, TSpaceParams, TSpaceConfigAsDependency, TSpaceHooks> & TParamsFromConfig<TSpaceConfig, TSpaceParams>;
