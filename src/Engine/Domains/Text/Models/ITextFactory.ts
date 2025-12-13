import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import type { ITextParams, ITextWrapper } from '@/Engine/Domains/Text/Models';
import type { IDestroyable } from '@/Engine/Mixins';

export type ITextFactory = IReactiveFactory<ITextWrapper, ITextParams> & IDestroyable;
