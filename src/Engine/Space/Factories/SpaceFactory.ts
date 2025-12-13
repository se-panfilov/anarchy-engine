import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Space/Adapters';
import { Space, SpaceFromConfig } from '@/Engine/Space/Entities';
import type { TSpace, TSpaceConfigAsDependency, TSpaceFactory, TSpaceParams } from '@/Engine/Space/Models';
import { isDefined } from '@/Engine/Utils';

function create(params: TSpaceParams, config: TSpaceConfigAsDependency): TSpace | never {
  if (isDefined(config) && Object.keys.length !== 0) return SpaceFromConfig(params, config);
  return Space(params);
}

const factory: TReactiveFactory<TSpace, TSpaceParams, TSpaceConfigAsDependency> = ReactiveFactory(FactoryType.Space, create);
// eslint-disable-next-line functional/immutable-data
export const SpaceFactory = (): TSpaceFactory => Object.assign(factory, { configToParams });
