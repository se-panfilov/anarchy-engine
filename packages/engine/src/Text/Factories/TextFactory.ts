import type { TReactiveFactory } from '@/Abstract';
import { FactoryType, ReactiveFactory } from '@/Abstract';
import { configToParams } from '@/Text/Adapters';
import type { TTextAnyWrapper, TTextFactory, TTextParams, TTextServiceDependencies } from '@/Text/Models';
import { buildTextWrapper } from '@/Text/Wrappers';

export function TextFactory(): TTextFactory {
  const factory: TReactiveFactory<TTextAnyWrapper, TTextParams, TTextServiceDependencies> = ReactiveFactory(FactoryType.Text, buildTextWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
