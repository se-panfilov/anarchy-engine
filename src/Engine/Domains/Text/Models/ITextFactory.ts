import type { IParamsFromConfig, IReactiveFactory } from '@/Engine/Domains/Abstract';
import type { ITextConfig, ITextParams, ITextWrapper } from '@/Engine/Domains/Text/Models';
import type { IDestroyable } from '@/Engine/Mixins';

export type ITextFactory = IReactiveFactory<ITextWrapper, ITextParams> & IParamsFromConfig<ITextConfig, ITextParams> & IDestroyable;
