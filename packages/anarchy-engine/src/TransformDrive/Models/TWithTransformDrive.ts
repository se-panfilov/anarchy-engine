import type { TDriveToTargetConnector, TTransformDriveCompatibleEntity } from '@Engine/TransformDrive';

import type { TTransformDrive } from './TTransformDrive';

export type TWithTransformDrive<T extends TTransformDriveCompatibleEntity> = Readonly<{
  drive: TTransformDrive<T>;
  driveToTargetConnector: TDriveToTargetConnector;
}>;
