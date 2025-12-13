import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';

import type { TTransformDrive, TTransformDriveCompatibleEntity } from './TTransformDrive';
import type { TTransformDriveFactory } from './TTransformDriveFactory';
import type { TTransformDriveFactoryParams } from './TTransformDriveFactoryParams';
import type { TTransformDriveParams } from './TTransformDriveParams';
import type { TTransformDriveRegistry } from './TTransformDriveRegistry';

export type TTransformDriveServiceWithCreate = TWithCreateService<TTransformDrive<TTransformDriveCompatibleEntity>, TTransformDriveParams>;
export type TTransformDriveServiceWithFactory = TWithFactoryService<TTransformDrive<TTransformDriveCompatibleEntity>, TTransformDriveFactoryParams, undefined, TTransformDriveFactory>;
export type TTransformDriveServiceWithRegistry = TWithRegistryService<TTransformDriveRegistry>;

export type TTransformDriveService = TAbstractService & TTransformDriveServiceWithCreate & TTransformDriveServiceWithFactory & TTransformDriveServiceWithRegistry;
