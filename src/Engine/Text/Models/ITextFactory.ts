import type { IParamsFromConfig, IReactiveFactory } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';
import type { ITextAnyWrapper, ITextConfig, ITextParams } from '@/Engine/Text/Models';

export type ITextFactory = IReactiveFactory<ITextAnyWrapper, ITextParams> & IParamsFromConfig<ITextConfig, ITextParams> & IDestroyable;
