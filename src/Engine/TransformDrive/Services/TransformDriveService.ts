import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TDisposable } from '@/Engine/Mixins';
import { withFactoryService, withRegistryService } from '@/Engine/Mixins';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type {
  TAbstractTransformAgent,
  TTransformDrive,
  TTransformDriveCompatibleEntity,
  TTransformDriveFactory,
  TTransformDriveParams,
  TTransformDriveRegistry,
  TTransformDriveService,
  TTransformDriveServiceWithFactory,
  TTransformDriveServiceWithRegistry
} from '@/Engine/TransformDrive/Models';

export function TransformDriveService(factory: TTransformDriveFactory, registry: TTransformDriveRegistry): TTransformDriveService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((entity: TTransformDrive<TTransformDriveCompatibleEntity>): void => registry.add(entity));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = <T extends Partial<Record<TransformAgent, TAbstractTransformAgent>>>(params: TTransformDriveParams, agents: T): TTransformDrive<T> => factory.create({ params, agents });
  const createFromList = <T extends Partial<Record<TransformAgent, TAbstractTransformAgent>>>(
    paramsList: ReadonlyArray<TTransformDriveParams>,
    agentsList: ReadonlyArray<T>
  ): ReadonlyArray<TTransformDrive<T>> => {
    if (paramsList.length !== agentsList.length) throw new Error('TransformDriveService: paramsList and agentsList should have the same length');
    return paramsList.map((p: TTransformDriveParams, i: number): TTransformDrive<T> => create(p, agentsList[i] as T));
  };

  // const withCreateService: TTransformDriveServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withFactory: TTransformDriveServiceWithFactory = withFactoryService(factory);
  const withRegistry: TTransformDriveServiceWithRegistry = withRegistryService(registry);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, create, createFromList, withFactory, withRegistry);
}
