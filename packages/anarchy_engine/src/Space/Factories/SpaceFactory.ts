import type { TReactiveFactory } from '@Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Abstract';
import { configToParams } from '@Engine/Space/Adapters';
import { Space, SpaceFromConfig } from '@Engine/Space/Entities';
import type { TSpace, TSpaceFactory, TSpaceFactoryDependencies, TSpaceParams, TSpaceSettings } from '@Engine/Space/Models';
import { isDefined } from '@Shared/Utils';

function create(params: TSpaceParams, { config, registry }: TSpaceFactoryDependencies, settings?: TSpaceSettings): TSpace | never {
  if (isDefined(config) && Object.keys.length !== 0) return SpaceFromConfig(params, config, registry, settings);
  return Space(params, registry, settings);
}

export function SpaceFactory(): TSpaceFactory {
  const factory: TReactiveFactory<TSpace, TSpaceParams, TSpaceFactoryDependencies, TSpaceSettings> = ReactiveFactory(FactoryType.Space, create);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
