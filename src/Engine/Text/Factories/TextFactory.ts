import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from 'src/Engine/Text/Adapters';
import type { ITextAnyWrapper, ITextFactory, ITextParams } from '@/Engine/Text/Models';
import { buildTextWrapper } from 'src/Engine/Text/Wrappers';

const factory: IReactiveFactory<ITextAnyWrapper, ITextParams> = { ...ReactiveFactory(FactoryType.Text, buildTextWrapper) };
export const TextFactory = (): ITextFactory => ({ ...factory, configToParams });
