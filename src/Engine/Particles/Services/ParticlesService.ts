import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TMaterialRegistry, TMaterialService } from '@/Engine/Material';
import type { TDisposable } from '@/Engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSceneGetterService } from '@/Engine/Mixins';
import type {
  TParticlesFactory,
  TParticlesRegistry,
  TParticlesService,
  TParticlesServiceWithCreate,
  TParticlesServiceWithCreateFromConfig,
  TParticlesServiceWithFactory,
  TParticlesServiceWithRegistry,
  TParticlesWrapper
} from '@/Engine/Particles/Models';
import type { TSceneWrapper } from '@/Engine/Scene';

export function ParticlesService(factory: TParticlesFactory, registry: TParticlesRegistry, materialService: TMaterialService, scene: TSceneWrapper): TParticlesService {
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TParticlesWrapper>): void => scene.addParticles(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TParticlesWrapper): void => registry.add(wrapper));
  const materialRegistry: TMaterialRegistry = materialService.getRegistry();

  const disposable: ReadonlyArray<TDisposable> = [registry, factory, registrySub$, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TParticlesServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withCreateFromConfigService: TParticlesServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams, { materialRegistry });
  const withFactory: TParticlesServiceWithFactory = withFactoryService(factory);
  const withRegistry: TParticlesServiceWithRegistry = withRegistryService(registry);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withCreateService, withCreateFromConfigService, withFactory, withRegistry, withSceneGetterService(scene));
}
