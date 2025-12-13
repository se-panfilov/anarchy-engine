import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';
import type { ITextAnyWrapper, ITextConfig, ITextParams } from '@/Engine/Text/Models';

export type ITextFactory = TReactiveFactory<ITextAnyWrapper, ITextParams> & TParamsFromConfig<ITextConfig, ITextParams> & TDestroyable;
