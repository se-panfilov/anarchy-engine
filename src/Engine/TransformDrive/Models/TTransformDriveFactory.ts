import type { TReactiveFactory } from '@/Engine/Abstract';

import type { TTransformDrive, TTransformDriveCompatibleEntity } from './TTransformDrive';
import type { TTransformDriveParams } from './TTransformDriveParams';

export type TTransformDriveFactory = TReactiveFactory<TTransformDrive<TTransformDriveCompatibleEntity>, TTransformDriveParams>;
