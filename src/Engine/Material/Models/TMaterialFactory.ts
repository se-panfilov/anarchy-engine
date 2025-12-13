import type { TParamsFromConfigWithDependencies, TReactiveFactory } from '@/Engine/Abstract';

import type { TMaterialConfig } from './TMaterialConfig';
import type { TMaterialConfigToParamsDependencies } from './TMaterialConfigToParamsDependencies';
import type { TMaterialParams } from './TMaterialParams';
import type { TMaterialWrapper } from './TMaterialWrapper';

export type TMaterialFactory = TReactiveFactory<TMaterialWrapper, TMaterialParams> & TParamsFromConfigWithDependencies<TMaterialConfig, TMaterialParams, TMaterialConfigToParamsDependencies>;
