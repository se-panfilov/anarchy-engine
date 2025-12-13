import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TTextAnyWrapper, TTextConfig, TTextParams } from '@/Engine/Text/Models';

export type TTextFactory = TReactiveFactory<TTextAnyWrapper, TTextParams> & TParamsFromConfig<TTextConfig, TTextParams> & TDestroyable;
