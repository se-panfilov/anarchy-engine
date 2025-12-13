import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Space/Adapters';
import { Space, SpaceFromConfig } from '@/Engine/Space/Entities';
import type { TSpace, TSpaceFactory, TSpaceFactoryDependencies, TSpaceParams } from '@/Engine/Space/Models';
import { isDefined } from '@/Engine/Utils';

function create(params: TSpaceParams, { config, hooks }: TSpaceFactoryDependencies): TSpace | never {
  if (isDefined(config) && Object.keys.length !== 0) return SpaceFromConfig(params, config, hooks);
  return Space(params, hooks);
}

const factory: TReactiveFactory<TSpace, TSpaceParams, TSpaceFactoryDependencies> = ReactiveFactory(FactoryType.Space, create);
// eslint-disable-next-line functional/immutable-data
export const SpaceFactory = (): TSpaceFactory => Object.assign(factory, { configToParams });
