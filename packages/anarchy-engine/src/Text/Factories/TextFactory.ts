import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { textConfigToParams } from '@hellpig/anarchy-engine/Text/Adapters';
import type { TTextAnyWrapper, TTextFactory, TTextParams, TTextServiceDependencies } from '@hellpig/anarchy-engine/Text/Models';
import { buildTextWrapper } from '@hellpig/anarchy-engine/Text/Wrappers';

export function TextFactory(): TTextFactory {
  const factory: TReactiveFactory<TTextAnyWrapper, TTextParams, TTextServiceDependencies> = ReactiveFactory(FactoryType.Text, buildTextWrapper);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: textConfigToParams });
}
