import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';
import type { ITextConfig, ITextParams, TTextAnyWrapper } from '@/Engine/Text/Models';

export type ITextFactory = TReactiveFactory<TTextAnyWrapper, ITextParams> & TParamsFromConfig<ITextConfig, ITextParams> & TDestroyable;
