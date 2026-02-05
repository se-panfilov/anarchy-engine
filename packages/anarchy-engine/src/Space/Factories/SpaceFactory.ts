import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { spaceConfigToParams } from '@hellpig/anarchy-engine/Space/Adapters';
import { Space, SpaceFromConfig } from '@hellpig/anarchy-engine/Space/Entities';
import type { TSpace, TSpaceFactory, TSpaceFactoryDependencies, TSpaceParams, TSpaceSettings } from '@hellpig/anarchy-engine/Space/Models';
import { isDefined } from '@hellpig/anarchy-shared/Utils';

function create(params: TSpaceParams, { config, registry }: TSpaceFactoryDependencies, settings?: TSpaceSettings): TSpace | never {
  if (isDefined(config) && Object.keys.length !== 0) return SpaceFromConfig(params, config, registry, settings);
  return Space(params, registry, settings);
}

export function SpaceFactory(): TSpaceFactory {
  const factory: TReactiveFactory<TSpace, TSpaceParams, TSpaceFactoryDependencies, TSpaceSettings> = ReactiveFactory(FactoryType.Space, create);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: spaceConfigToParams });
}
