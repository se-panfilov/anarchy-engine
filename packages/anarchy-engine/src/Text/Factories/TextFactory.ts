import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { configToParams } from '@Anarchy/Engine/Text/Adapters';
import type { TTextAnyWrapper, TTextFactory, TTextParams, TTextServiceDependencies } from '@Anarchy/Engine/Text/Models';
import { buildTextWrapper } from '@Anarchy/Engine/Text/Wrappers';

export function TextFactory(): TTextFactory {
  const factory: TReactiveFactory<TTextAnyWrapper, TTextParams, TTextServiceDependencies> = ReactiveFactory(FactoryType.Text, buildTextWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
