import type { TParamsFromConfigWithDependencies, TReactiveFactory } from '@Anarchy/Engine/Abstract';
import type { TTextAnyWrapper, TTextConfig, TTextParams, TTextServiceDependencies } from '@Anarchy/Engine/Text/Models';

export type TTextFactory = TReactiveFactory<TTextAnyWrapper, TTextParams, TTextServiceDependencies> & TParamsFromConfigWithDependencies<TTextConfig, TTextParams, TTextServiceDependencies>;
