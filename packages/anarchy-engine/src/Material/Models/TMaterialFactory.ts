import type { TParamsFromConfigWithDependencies, TReactiveFactory } from '@Anarchy/Engine/Abstract';

import type { TAnyMaterialWrapper } from './TAnyMaterialWrapper';
import type { TMaterialConfig } from './TMaterialConfig';
import type { TMaterialConfigToParamsDependencies } from './TMaterialConfigToParamsDependencies';
import type { TMaterialParams } from './TMaterialParams';

export type TMaterialFactory = TReactiveFactory<TAnyMaterialWrapper, TMaterialParams> & TParamsFromConfigWithDependencies<TMaterialConfig, TMaterialParams, TMaterialConfigToParamsDependencies>;
