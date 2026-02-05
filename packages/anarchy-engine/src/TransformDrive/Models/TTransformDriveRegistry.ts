import type { TAbstractEntityRegistry } from '@hellpig/anarchy-engine/Abstract';

import type { TTransformDrive, TTransformDriveCompatibleEntity } from './TTransformDrive';

export type TTransformDriveRegistry = TAbstractEntityRegistry<TTransformDrive<TTransformDriveCompatibleEntity>>;
