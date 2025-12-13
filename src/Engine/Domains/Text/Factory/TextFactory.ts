import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Domains/Abstract';
import { configToParams } from '@/Engine/Domains/Text/Adapter';
import type { ITextAnyWrapper, ITextFactory, ITextParams } from '@/Engine/Domains/Text/Models';
import { buildTextWrapper } from '@/Engine/Domains/Text/Wrapper';

const factory: IReactiveFactory<ITextAnyWrapper, ITextParams> = { ...ReactiveFactory(FactoryType.Text, buildTextWrapper) };
export const TextFactory = (): ITextFactory => ({ ...factory, configToParams });
