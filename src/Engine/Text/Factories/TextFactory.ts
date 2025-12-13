import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Text/Adapters';
import type { ITextFactory, ITextParams, TTextAnyWrapper } from '@/Engine/Text/Models';
import { buildTextWrapper } from '@/Engine/Text/Wrappers';

const factory: TReactiveFactory<TTextAnyWrapper, ITextParams> = { ...ReactiveFactory(FactoryType.Text, buildTextWrapper) };
export const TextFactory = (): ITextFactory => ({ ...factory, configToParams });
