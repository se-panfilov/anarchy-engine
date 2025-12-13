import type { TAbstractEntityRegistry } from '@Anarchy/Engine/Abstract';

import type { TTransformDrive, TTransformDriveCompatibleEntity } from './TTransformDrive';

export type TTransformDriveRegistry = TAbstractEntityRegistry<TTransformDrive<TTransformDriveCompatibleEntity>>;
