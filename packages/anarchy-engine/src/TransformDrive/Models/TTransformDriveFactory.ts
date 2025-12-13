import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';

import type { TTransformDrive, TTransformDriveCompatibleEntity } from './TTransformDrive';
import type { TTransformDriveFactoryParams } from './TTransformDriveFactoryParams';

export type TTransformDriveFactory = TReactiveFactory<TTransformDrive<TTransformDriveCompatibleEntity>, TTransformDriveFactoryParams>;
