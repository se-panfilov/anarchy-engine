import type { IParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';
import type { ITextAnyWrapper, ITextConfig, ITextParams } from '@/Engine/Text/Models';

export type ITextFactory = TReactiveFactory<ITextAnyWrapper, ITextParams> & IParamsFromConfig<ITextConfig, ITextParams> & TDestroyable;
