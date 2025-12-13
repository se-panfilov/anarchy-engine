import type { TDriveToTargetConnector } from './TDriveToTargetConnector';
import type { TTransformDrive, TTransformDriveCompatibleEntity } from './TTransformDrive';

export type TWithTransformDrive<T extends TTransformDriveCompatibleEntity> = Readonly<{
  drive: TTransformDrive<T>;
  driveToTargetConnector: TDriveToTargetConnector;
}>;
