import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Text/Adapters';
import type { TTextAnyWrapper, TTextFactory, TTextParams } from '@/Engine/Text/Models';
import { buildTextWrapper } from '@/Engine/Text/Wrappers';

const factory: TReactiveFactory<TTextAnyWrapper, TTextParams> = ReactiveFactory(FactoryType.Text, buildTextWrapper);
export const TextFactory = (): TTextFactory => ({ ...factory, configToParams });
