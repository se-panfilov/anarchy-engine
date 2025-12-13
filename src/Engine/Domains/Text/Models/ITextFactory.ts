import type { IParamsFromConfig, IReactiveFactory } from '@/Engine/Domains/Abstract';
import type { ITextAnyWrapper, ITextConfig, ITextParams } from '@/Engine/Domains/Text/Models';
import type { IDestroyable } from '@/Engine/Mixins';

export type ITextFactory = IReactiveFactory<ITextAnyWrapper, ITextParams> & IParamsFromConfig<ITextConfig, ITextParams> & IDestroyable;
