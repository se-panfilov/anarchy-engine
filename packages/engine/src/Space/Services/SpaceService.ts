import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Abstract';
import { AbstractService } from '@/Abstract';
import type { TDisposable } from '@/Mixins';
import { withCreateServiceWithHooksMixin, withFactoryService, withRegistryService, withSerializableEntities } from '@/Mixins';
import { SpaceFactory } from '@/Space/Factories';
import type { TSpace, TSpaceConfig, TSpaceFactory, TSpaceHooks, TSpaceRegistry, TSpaceService, TSpaceServiceWithCreate, TSpaceServiceWithFactory, TSpaceServiceWithRegistry } from '@/Space/Models';
import { SpaceRegistry } from '@/Space/Registries';
import { validateConfig, validateSpacesDoNotUseSameCanvas } from '@/Space/Validators';
import { mergeAll } from '@/Utils';

export function SpaceService(factory: TSpaceFactory, registry: TSpaceRegistry): TSpaceService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((space: TSpace): void => {
    if (!validateSpacesDoNotUseSameCanvas(registry, space)) throw new Error('SpaceService: Spaces must not use the same canvas');
    registry.add(space);
  });
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const createFromConfig = (spaces: ReadonlyArray<TSpaceConfig>, hooks?: TSpaceHooks): ReadonlyArray<TSpace> => {
    return spaces.map((config: TSpaceConfig): TSpace => {
      hooks?.beforeConfigValidation?.(config);
      validateConfig(config);
      return factory.create(factory.configToParams(config), { config, registry, hooks });
    });
  };

  const withCreateService: TSpaceServiceWithCreate = withCreateServiceWithHooksMixin(factory, { registry });
  const withFactory: TSpaceServiceWithFactory = withFactoryService(factory);
  const withRegistry: TSpaceServiceWithRegistry = withRegistryService(registry);

  return mergeAll(abstractService, withCreateService, withFactory, withRegistry, withSerializableEntities<TSpace, TSpaceConfig, undefined>(registry), { createFromConfig });
}

export const spaceService: TSpaceService = SpaceService(SpaceFactory(), SpaceRegistry());
