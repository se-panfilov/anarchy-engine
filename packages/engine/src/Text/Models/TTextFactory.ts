import type { TParamsFromConfigWithDependencies, TReactiveFactory } from '@Engine/Abstract';
import type { TTextAnyWrapper, TTextConfig, TTextParams, TTextServiceDependencies } from '@Engine/Text/Models';

export type TTextFactory = TReactiveFactory<TTextAnyWrapper, TTextParams, TTextServiceDependencies> & TParamsFromConfigWithDependencies<TTextConfig, TTextParams, TTextServiceDependencies>;
