import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TDisposable } from '@/Engine/Mixins';
import { withCreateServiceMixin, withFactoryService, withRegistryService } from '@/Engine/Mixins';
import type {
  TTransformDrive,
  TTransformDriveCompatibleEntity,
  TTransformDriveFactory,
  TTransformDriveRegistry,
  TTransformDriveService,
  TTransformDriveServiceWithCreate,
  TTransformDriveServiceWithFactory,
  TTransformDriveServiceWithRegistry
} from '@/Engine/TransformDrive/Models';

export function TransformDriveService(factory: TTransformDriveFactory, registry: TTransformDriveRegistry): TTransformDriveService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((entity: TTransformDrive<TTransformDriveCompatibleEntity>): void => registry.add(entity));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TTransformDriveServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withFactory: TTransformDriveServiceWithFactory = withFactoryService(factory);
  const withRegistry: TTransformDriveServiceWithRegistry = withRegistryService(registry);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withCreateService, withFactory, withRegistry);
}
