import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TDisposable } from '@/Engine/Mixins';
import { withCreateServiceWithHooksMixin, withFactoryService, withRegistryService } from '@/Engine/Mixins';
import { SpaceFactory } from '@/Engine/Space/Factories';
import type {
  TSpace,
  TSpaceConfig,
  TSpaceFactory,
  TSpaceHooks,
  TSpaceRegistry,
  TSpaceService,
  TSpaceServiceWithCreate,
  TSpaceServiceWithFactory,
  TSpaceServiceWithRegistry
} from '@/Engine/Space/Models';
import { SpaceRegistry } from '@/Engine/Space/Registries';
import { validateConfig, validateSpacesDoNotUseSameCanvas } from '@/Engine/Space/Validators';

export function SpaceService(factory: TSpaceFactory, registry: TSpaceRegistry): TSpaceService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((space: TSpace): void => {
    if (!validateSpacesDoNotUseSameCanvas(registry, space)) throw new Error('SpaceService: Spaces must not use the same canvas');
    registry.add(space);
  });
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const createFromConfig = (spaces: ReadonlyArray<TSpaceConfig>, hooks: TSpaceHooks): ReadonlyArray<TSpace> => {
    return spaces.map((config: TSpaceConfig): TSpace => {
      hooks?.beforeConfigValidation?.(config);
      validateConfig(config);
      return factory.create(factory.configToParams(config), { config, hooks });
    });
  };

  const withCreateService: TSpaceServiceWithCreate = withCreateServiceWithHooksMixin(factory, undefined);
  const withFactory: TSpaceServiceWithFactory = withFactoryService(factory);
  const withRegistry: TSpaceServiceWithRegistry = withRegistryService(registry);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withCreateService, withFactory, withRegistry, { createFromConfig });
}

export const spaceService: TSpaceService = SpaceService(SpaceFactory(), SpaceRegistry());
