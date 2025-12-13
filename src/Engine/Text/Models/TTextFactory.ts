import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TTextAnyWrapper, TTextConfig, TTextDependencies, TTextParams } from '@/Engine/Text/Models';

export type TTextFactory = TReactiveFactory<TTextAnyWrapper, TTextParams, TTextDependencies> & TParamsFromConfig<TTextConfig, TTextParams>;
