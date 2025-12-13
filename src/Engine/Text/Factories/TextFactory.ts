import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Text/Adapters';
import type { TTextAnyWrapper, TTextDependencies, TTextFactory, TTextParams } from '@/Engine/Text/Models';
import { buildTextWrapper } from '@/Engine/Text/Wrappers';

const factory: TReactiveFactoryWithDependencies<TTextAnyWrapper, TTextParams, TTextDependencies> = ReactiveFactoryWithDependencies(FactoryType.Text, buildTextWrapper);
// eslint-disable-next-line functional/immutable-data
export const TextFactory = (): TTextFactory => Object.assign(factory, { configToParams });
