import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TTextAnyWrapper, TTextConfig, TTextParams, TTextServiceDependencies } from '@/Engine/Text/Models';

export type TTextFactory = TReactiveFactory<TTextAnyWrapper, TTextParams, TTextServiceDependencies> & TParamsFromConfig<TTextConfig, TTextParams>;
