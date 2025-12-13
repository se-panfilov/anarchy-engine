import type { TParamsFromConfig, TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import type { TTextAnyWrapper, TTextConfig, TTextDependencies, TTextParams } from '@/Engine/Text/Models';

export type TTextFactory = TReactiveFactoryWithDependencies<TTextAnyWrapper, TTextParams, TTextDependencies> & TParamsFromConfig<TTextConfig, TTextParams>;
