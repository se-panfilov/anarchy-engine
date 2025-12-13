import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TDisposable } from '@/Engine/Mixins';
import { SpaceFactory } from '@/Engine/Space/Factories';
import type { TSpace, TSpaceConfig, TSpaceFactory, TSpaceParams, TSpaceRegistry, TSpaceService } from '@/Engine/Space/Models';
import { SpaceRegistry } from '@/Engine/Space/Registries';

export function SpaceService(factory: TSpaceFactory, registry: TSpaceRegistry): TSpaceService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((space: TSpace): void => registry.add(space));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = (params: TSpaceParams): TSpace => factory.create(params);
  const createFromConfig = (spaces: ReadonlyArray<TSpaceConfig>): ReadonlyArray<TSpace> => spaces.map((config: TSpaceConfig): TSpace => create(factory.configToParams(config)));

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromConfig,
    getFactory: (): TSpaceFactory => factory,
    getRegistry: (): TSpaceRegistry => registry
  });
}

export const spaceService: TSpaceService = SpaceService(SpaceFactory(), SpaceRegistry());
