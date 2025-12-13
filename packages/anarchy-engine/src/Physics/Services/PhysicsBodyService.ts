import type { TAbstractService } from '@Engine/Abstract';
import { AbstractService } from '@Engine/Abstract';
import type { TDisposable } from '@Engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSerializableEntities } from '@Engine/Mixins';
import type {
  TPhysicsBody,
  TPhysicsBodyConfig,
  TPhysicsBodyFactory,
  TPhysicsBodyRegistry,
  TPhysicsBodyService,
  TPhysicsBodyServiceWithCreate,
  TPhysicsBodyServiceWithCreateFromConfig,
  TPhysicsBodyServiceWithFactory,
  TPhysicsBodyServiceWithRegistry,
  TPhysicsWorldService
} from '@Engine/Physics/Models';
import { getKinematicDataFromPhysics } from '@Engine/Physics/Utils';
import { mergeAll } from '@Engine/Utils';
import type { Subscription } from 'rxjs';

export function PhysicsBodyService(factory: TPhysicsBodyFactory, registry: TPhysicsBodyRegistry, physicsWorldService: TPhysicsWorldService): TPhysicsBodyService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((body: TPhysicsBody): void => registry.add(body));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TPhysicsBodyServiceWithCreate = withCreateServiceMixin(factory, { physicsWorldService });
  const withCreateFromConfigService: TPhysicsBodyServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams, undefined);
  const withFactory: TPhysicsBodyServiceWithFactory = withFactoryService(factory);
  const withRegistry: TPhysicsBodyServiceWithRegistry = withRegistryService(registry);

  return mergeAll(
    abstractService,
    withCreateService,
    withCreateFromConfigService,
    withFactory,
    withRegistry,
    withSerializableEntities<TPhysicsBody, TPhysicsBodyConfig, undefined>(registry),

    {
      getKinematicDataFromPhysics
    }
  );
}
