import { FactoryType, ReactiveFactory } from '@/Abstract';
import { TransformDrive } from '@/TransformDrive/Entities';
import type { TTransformDriveFactory, TTransformDriveFactoryParams } from '@/TransformDrive/Models';

export function TransformDriveFactory(): TTransformDriveFactory {
  return ReactiveFactory(FactoryType.TransformDrive, ({ params, agents }: TTransformDriveFactoryParams) => TransformDrive(params, agents));
}
