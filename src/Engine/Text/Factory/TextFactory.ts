import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Text/Adapter';
import type { ITextAnyWrapper, ITextFactory, ITextParams } from '@/Engine/Text/Models';
import { buildTextWrapper } from '@/Engine/Text/Wrapper';

const factory: IReactiveFactory<ITextAnyWrapper, ITextParams> = { ...ReactiveFactory(FactoryType.Text, buildTextWrapper) };
export const TextFactory = (): ITextFactory => ({ ...factory, configToParams });
