import type { TParamsFromConfigWithDependencies, TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import type { TTextAnyWrapper, TTextConfig, TTextParams, TTextServiceDependencies } from '@hellpig/anarchy-engine/Text/Models';

export type TTextFactory = TReactiveFactory<TTextAnyWrapper, TTextParams, TTextServiceDependencies> & TParamsFromConfigWithDependencies<TTextConfig, TTextParams, TTextServiceDependencies>;
