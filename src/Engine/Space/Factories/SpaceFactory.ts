import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Space/Adapters';
import { Space, SpaceFromConfig } from '@/Engine/Space/Entities';
import type { TSpace, TSpaceFactory, TSpaceFactoryDependencies, TSpaceParams } from '@/Engine/Space/Models';
import { isDefined } from '@/Engine/Utils';

function create(params: TSpaceParams, { config, hooks, registry }: TSpaceFactoryDependencies): TSpace | never {
  if (isDefined(config) && Object.keys.length !== 0) return SpaceFromConfig(params, config, registry, hooks);
  return Space(params, registry, hooks);
}

export function SpaceFactory(): TSpaceFactory {
  const factory: TReactiveFactory<TSpace, TSpaceParams, TSpaceFactoryDependencies> = ReactiveFactory(FactoryType.Space, create);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
