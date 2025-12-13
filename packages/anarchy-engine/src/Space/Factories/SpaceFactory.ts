import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { configToParams } from '@Anarchy/Engine/Space/Adapters';
import { Space, SpaceFromConfig } from '@Anarchy/Engine/Space/Entities';
import type { TSpace, TSpaceFactory, TSpaceFactoryDependencies, TSpaceParams, TSpaceSettings } from '@Anarchy/Engine/Space/Models';
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
