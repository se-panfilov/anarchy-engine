import type { World } from '@dimforge/rapier3d';
import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TDisposable } from '@/Engine/Mixins';
import { withFactoryService, withRegistryService, withSerializeAllEntities } from '@/Engine/Mixins';
import type {
  TPhysicsBody,
  TPhysicsBodyConfig,
  TPhysicsBodyFactory,
  TPhysicsBodyParams,
  TPhysicsBodyRegistry,
  TPhysicsBodyService,
  TPhysicsBodyServiceWithFactory,
  TPhysicsBodyServiceWithRegistry,
  TPhysicsWorldService
} from '@/Engine/Physics/Models';
import { getKinematicDataFromPhysics } from '@/Engine/Physics/Utils';
import { isNotDefined } from '@/Engine/Utils';

export function PhysicsBodyService(factory: TPhysicsBodyFactory, registry: TPhysicsBodyRegistry, physicsWorldService: TPhysicsWorldService): TPhysicsBodyService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((body: TPhysicsBody): void => registry.add(body));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = (params: TPhysicsBodyParams): TPhysicsBody | never => {
    const world: World | undefined = physicsWorldService.findWorld();
    if (isNotDefined(world)) throw new Error('Cannot create physics body: physical world is not defined');
    return factory.create(params, { world });
  };

  const createFromList = (list: ReadonlyArray<TPhysicsBodyParams>): ReadonlyArray<TPhysicsBody> => list.map(create);

  const createFromConfig = (physics: ReadonlyArray<TWithPresetNamePhysicsBodyConfig>): ReadonlyArray<TPhysicsBody> => {
    return physics.map((config: TWithPresetNamePhysicsBodyConfig): TPhysicsBody => {
      return create(physicsPresetService.getMergedConfigWithPresetParams(config, factory));
    });
  };

  const withFactory: TPhysicsBodyServiceWithFactory = withFactoryService(factory);
  const withRegistry: TPhysicsBodyServiceWithRegistry = withRegistryService(registry);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withFactory, withRegistry, withSerializeAllEntities<TPhysicsBodyConfig, undefined>(registry), {
    create,
    createFromList,
    createFromConfig,
    getKinematicDataFromPhysics
  });
}
