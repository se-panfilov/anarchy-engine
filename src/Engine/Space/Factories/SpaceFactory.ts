import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Space/Adapters';
import { Space } from '@/Engine/Space/Entities';
import type { TSpace, TSpaceFactory, TSpaceParams } from '@/Engine/Space/Models';

const factory: TReactiveFactory<TSpace, TSpaceParams> = ReactiveFactory(FactoryType.Space, Space);
// eslint-disable-next-line functional/immutable-data
export const SpaceFactory = (): TSpaceFactory => Object.assign(factory, { configToParams });
