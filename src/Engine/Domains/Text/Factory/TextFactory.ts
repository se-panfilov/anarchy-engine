import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Domains/Abstract';
import type { ITextFactory, ITextParams, ITextWrapper } from '@/Engine/Domains/Text/Models';
import { TextWrapper } from '@/Engine/Domains/Text/Wrapper';

const factory: IReactiveFactory<ITextWrapper, ITextParams> = { ...ReactiveFactory(FactoryType.Text, TextWrapper) };
export const TextFactory = (): ITextFactory => factory;
