import type { TParamsFromConfigWithDependencies, TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';

import type { TAnyMaterialWrapper } from './TAnyMaterialWrapper';
import type { TMaterialConfig } from './TMaterialConfig';
import type { TMaterialConfigToParamsDependencies } from './TMaterialConfigToParamsDependencies';
import type { TMaterialParams } from './TMaterialParams';

export type TMaterialFactory = TReactiveFactory<TAnyMaterialWrapper, TMaterialParams> & TParamsFromConfigWithDependencies<TMaterialConfig, TMaterialParams, TMaterialConfigToParamsDependencies>;
