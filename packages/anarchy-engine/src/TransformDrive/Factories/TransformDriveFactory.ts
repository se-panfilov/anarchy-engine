import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { TransformDrive } from '@hellpig/anarchy-engine/TransformDrive/Entities';
import type { TTransformDriveFactory, TTransformDriveFactoryParams } from '@hellpig/anarchy-engine/TransformDrive/Models';

export function TransformDriveFactory(): TTransformDriveFactory {
  return ReactiveFactory(FactoryType.TransformDrive, ({ params, agents }: TTransformDriveFactoryParams) => TransformDrive(params, agents));
}
