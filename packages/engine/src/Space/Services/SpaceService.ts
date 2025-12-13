import type { TAbstractService } from '@Engine/Abstract';
import { AbstractService } from '@Engine/Abstract';
import type { TDisposable } from '@Engine/Mixins';
import { withCreateServiceWithHooksAndFlagsMixin, withFactoryService, withRegistryService, withSerializableEntities } from '@Engine/Mixins';
import { SpaceFactory } from '@Engine/Space/Factories';
import type {
  TSpace,
  TSpaceConfig,
  TSpaceFactory,
  TSpaceFlags,
  TSpaceHooks,
  TSpaceRegistry,
  TSpaceService,
  TSpaceServiceWithCreate,
  TSpaceServiceWithFactory,
  TSpaceServiceWithRegistry
} from '@Engine/Space/Models';
import { SpaceRegistry } from '@Engine/Space/Registries';
import { validateConfig, validateSpacesDoNotUseSameCanvas } from '@Engine/Space/Validators';
import { mergeAll } from '@Engine/Utils';
import type { Subscription } from 'rxjs';

export function SpaceService(factory: TSpaceFactory, registry: TSpaceRegistry): TSpaceService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((space: TSpace): void => {
    if (!validateSpacesDoNotUseSameCanvas(registry, space)) throw new Error('SpaceService: Spaces must not use the same canvas');
    registry.add(space);
  });
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const createFromConfig = (spaces: ReadonlyArray<TSpaceConfig>, hooks?: TSpaceHooks, flags?: TSpaceFlags): ReadonlyArray<TSpace> => {
    return spaces.map((config: TSpaceConfig): TSpace => {
      hooks?.beforeConfigValidation?.(config);
      validateConfig(config);
      return factory.create(factory.configToParams(config), { config, registry, hooks, flags });
    });
  };

  const withCreateService: TSpaceServiceWithCreate = withCreateServiceWithHooksMixin(factory, { registry });
  const withFactory: TSpaceServiceWithFactory = withFactoryService(factory);
  const withRegistry: TSpaceServiceWithRegistry = withRegistryService(registry);

  return mergeAll(abstractService, withCreateService, withFactory, withRegistry, withSerializableEntities<TSpace, TSpaceConfig, undefined>(registry), { createFromConfig });
}

export const spaceService: TSpaceService = SpaceService(SpaceFactory(), SpaceRegistry());
