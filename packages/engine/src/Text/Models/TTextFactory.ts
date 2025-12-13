import type { TParamsFromConfigWithDependencies, TReactiveFactory } from '@/Abstract';
import type { TTextAnyWrapper, TTextConfig, TTextParams, TTextServiceDependencies } from '@/Text/Models';

export type TTextFactory = TReactiveFactory<TTextAnyWrapper, TTextParams, TTextServiceDependencies> & TParamsFromConfigWithDependencies<TTextConfig, TTextParams, TTextServiceDependencies>;
