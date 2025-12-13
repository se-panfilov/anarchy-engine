import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import { AbstractService } from '@Anarchy/Engine/Abstract';
import type { TDisposable } from '@Anarchy/Engine/Mixins';
import { withCreateServiceMixin, withFactoryService, withRegistryService, withSerializableEntities } from '@Anarchy/Engine/Mixins';
import { SpaceFactory } from '@Anarchy/Engine/Space/Factories';
import type {
  TSpace,
  TSpaceConfig,
  TSpaceFactory,
  TSpaceRegistry,
  TSpaceService,
  TSpaceServiceWithCreate,
  TSpaceServiceWithFactory,
  TSpaceServiceWithRegistry,
  TSpaceSettings
} from '@Anarchy/Engine/Space/Models';
import { SpaceRegistry } from '@Anarchy/Engine/Space/Registries';
import { validateConfig, validateSpacesDoNotUseSameCanvas } from '@Anarchy/Engine/Space/Validators';
import { mergeAll } from '@Anarchy/Engine/Utils';
import type { Subscription } from 'rxjs';

export function SpaceService(factory: TSpaceFactory, registry: TSpaceRegistry): TSpaceService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((space: TSpace): void => {
    if (!validateSpacesDoNotUseSameCanvas(registry, space)) throw new Error('SpaceService: Spaces must not use the same canvas');
    registry.add(space);
  });
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const createFromConfig = (spaces: ReadonlyArray<TSpaceConfig>, settings?: TSpaceSettings): ReadonlyArray<TSpace> => {
    return spaces.map((config: TSpaceConfig): TSpace => {
      validateConfig(config);
      return factory.create(factory.configToParams(config), { config, registry }, settings);
    });
  };

  const withCreateService: TSpaceServiceWithCreate = withCreateServiceMixin(factory, { registry });
  const withFactory: TSpaceServiceWithFactory = withFactoryService(factory);
  const withRegistry: TSpaceServiceWithRegistry = withRegistryService(registry);

  return mergeAll(abstractService, withCreateService, withFactory, withRegistry, withSerializableEntities<TSpace, TSpaceConfig, undefined>(registry), { createFromConfig });
}

export const spaceService: TSpaceService = SpaceService(SpaceFactory(), SpaceRegistry());
