import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Text/Adapters';
import type { TTextAnyWrapper, TTextDependencies, TTextFactory, TTextParams } from '@/Engine/Text/Models';
import { buildTextWrapper } from '@/Engine/Text/Wrappers';

export function TextFactory(): TTextFactory {
  const factory: TReactiveFactory<TTextAnyWrapper, TTextParams, TTextDependencies> = ReactiveFactory(FactoryType.Text, buildTextWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
