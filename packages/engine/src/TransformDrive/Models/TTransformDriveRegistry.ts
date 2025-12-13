import type { TAbstractEntityRegistry } from '@/Abstract';

import type { TTransformDrive, TTransformDriveCompatibleEntity } from './TTransformDrive';

export type TTransformDriveRegistry = TAbstractEntityRegistry<TTransformDrive<TTransformDriveCompatibleEntity>>;
