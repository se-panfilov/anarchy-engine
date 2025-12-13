import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TDisposable } from '@/Engine/Mixins';
import { SpaceFactory } from '@/Engine/Space/Factories';
import type { TSpace, TSpaceConfig, TSpaceFactory, TSpaceHooks, TSpaceParams, TSpaceRegistry, TSpaceService } from '@/Engine/Space/Models';
import { SpaceRegistry } from '@/Engine/Space/Registries';
import { validateConfig } from '@/Engine/Space/Validators';

export function SpaceService(factory: TSpaceFactory, registry: TSpaceRegistry): TSpaceService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((space: TSpace): void => registry.add(space));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = (params: TSpaceParams, hooks?: TSpaceHooks): TSpace => factory.create(params, undefined, hooks);
  const createFromConfig = (spaces: ReadonlyArray<TSpaceConfig>, hooks?: TSpaceHooks): ReadonlyArray<TSpace> => {
    return spaces.map((config: TSpaceConfig): TSpace => {
      hooks?.beforeConfigValidation?.(config);
      validateConfig(config);
      return factory.create(factory.configToParams(config), config, hooks);
    });
  };

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromConfig,
    getFactory: (): TSpaceFactory => factory,
    getRegistry: (): TSpaceRegistry => registry
  });
}

export const spaceService: TSpaceService = SpaceService(SpaceFactory(), SpaceRegistry());
