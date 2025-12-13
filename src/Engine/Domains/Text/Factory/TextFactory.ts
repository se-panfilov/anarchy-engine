import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Domains/Abstract';
import { configToParams } from '@/Engine/Domains/Text/Adapter';
import type { ITextFactory, ITextParams, ITextWrapper } from '@/Engine/Domains/Text/Models';
import { Text2dWrapper } from '@/Engine/Domains/Text/Wrapper';

const factory: IReactiveFactory<ITextWrapper, ITextParams> = { ...ReactiveFactory(FactoryType.Text, Text2dWrapper) };
export const TextFactory = (): ITextFactory => ({ ...factory, configToParams });
